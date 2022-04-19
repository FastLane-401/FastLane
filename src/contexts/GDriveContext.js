/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react'
import {
  GDrive,
  ListQueryBuilder,
  MimeTypes
} from '@robinbobin/react-native-google-drive-api-wrapper'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { AuthContext } from './AuthContext'

const GDriveContext = createContext()
const gdrive = new GDrive()

const GDriveProvider = ({ children }) => {
  const [dirId, setDirId] = useState()
  const { loading } = useContext(AuthContext)

  useEffect(() => {
    async function init () {
      await initializeGDrive()
    }
    console.log('GDriveProvider: useEffect called. DirID: ', dirId)

    if (!loading) {
      init()
    }
  }, [loading])

  const initializeGDrive = useCallback(async () => {
    /* creates Fastlane directory in root directory of user's drive */
    try {
      console.log('Initializing tokens')
      if (gdrive.accessToken) {
        await GoogleSignin.clearCachedAccessToken(gdrive.accessToken)
        gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken
      } else {
        gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken
      }
      console.log('Creating directory')
      const id = (await gdrive.files.createIfNotExists({
        q: new ListQueryBuilder()
          .e('name', 'Fastlane')
          .and()
          .e('mimeType', MimeTypes.FOLDER)
          .and()
          .in('root', 'parents')
      },
      gdrive.files.newMetadataOnlyUploader()
        .setRequestBody({
          name: 'Fastlane',
          mimeType: MimeTypes.FOLDER,
          parents: ['root']
        })
      )).result.id
      console.log('Created directory with id: ', id)
      setDirId(id)
      console.log('Checking if directory id exists', dirId)
    } catch (e) {
      console.log('ERROR IN INITIALIZEGDRIVE: ', e)
    }
  }, [])

  const getDirId = useCallback(async () => {
    console.log('Getting dir id')
    if (!dirId) {
      console.log('Dir ID is null')
      try {
        console.log('Getting dir id')
        const id = (await gdrive.files.createIfNotExists({
          q: new ListQueryBuilder()

            .e('name', 'Fastlane')
            .and()
            .e('mimeType', MimeTypes.FOLDER)
            .and()
            .in('root', 'parents')
        },
        gdrive.files.newMetadataOnlyUploader()

          .setRequestBody({
            name: 'Fastlane',
            mimeType: MimeTypes.FOLDER,
            parents: ['root']
          })
        )).result.id
        return id
      } catch (e) {
        console.log('ERROR IN GETDIRID: ', e)
      }
    } else {
      console.log('Dir ID is not null')
      return dirId
    }
  }, [dirId])

  const writeToDrive = async (name, data) => {
    /* checks if file exists - creates if not */
    console.log('Writing to drive')
    console.log('Access Token: ', gdrive.accessToken)
    console.log({ data })
    console.log({ dirId })
    const dir = await getDirId()
    try {
      const id = (await gdrive.files.createIfNotExists({
        q: new ListQueryBuilder()
          .e('name', name)
          .and()
          .e('mimeType', MimeTypes.TEXT)
          .and()
          .in(dir, 'parents')
      },
      gdrive.files.newMetadataOnlyUploader()
        .setRequestBody({
          name: name,
          mimeType: MimeTypes.TEXT,
          parents: [dir]
        })
      )).result.id

      await gdrive.files.newMultipartUploader()
        .setIdOfFileToUpdate(id)
        .setData(data, MimeTypes.TEXT)
        .execute()
    } catch (e) {
      console.log('ERROR IN WRITETODRIVE: ', e)
    }
  }

  const listDriveFiles = async () => {
    console.log('Listing files')
    console.log('Access Token: ', gdrive.accessToken)
    console.log({ dirId })
    console.log(await gdrive.files.list(dirId))
  }

  return (
    <GDriveContext.Provider value={{
      listDriveFiles,
      writeToDrive
    }}>
      { children }
    </GDriveContext.Provider>
  )
}

export { GDriveContext, GDriveProvider }
