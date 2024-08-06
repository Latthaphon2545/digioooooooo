import request from 'supertest'
import axios from 'axios'

import app from '../../app'

import { ScbError } from '../../helpers/error.helper'

import { UserKeyModel } from '@planetx/models'

jest.mock('../../helpers/sequelize.helper', () => ({
  authenticate: jest.fn()
}))

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('GET /v1/kyc/scb/deeplink', () => {
  const originalConsole = { ...console }

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(async () => {
    jest.clearAllMocks()
    console.log = originalConsole.log
    console.warn = originalConsole.warn
    console.error = originalConsole.error
  })

  it('should return 400 with missing accessToken header', async () => {
    const requestHeader = { }

    const res = await request(app).get('/v1/kyc/scb/deeplink').set(requestHeader)
    const resDesc = JSON.parse(res.text).resDesc

    expect(res.status).toBe(400)
    expect(resDesc).toBe('Validation Error: accessToken header is required')
  })

  it('should return 500 with api error', async () => {
    const requestHeader = { accessToken: '1234' }

    const mockError = { status: { code: 404, description: 'test scb error' } }
    mockedAxios.get.mockRejectedValueOnce(new ScbError(mockError))

    const res = await request(app).get('/v1/kyc/scb/deeplink').set(requestHeader)
    const resData = JSON.parse(res.text)

    expect(res.status).toBe(500)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(resData.resCode).toEqual(mockError.status.code)
    expect(resData.resDesc).toEqual('Scb Error: ' + mockError.status.description)
  })

  it('should return 200 with responser', async () => {
    const requestHeader = { accessToken: '1234' }

    const mockData = { data: { deeppink: 'test-deeplink.com' } }
    mockedAxios.get.mockResolvedValueOnce({ data: mockData })

    const res = await request(app).get('/v1/kyc/scb/deeplink').set(requestHeader)
    const resData = JSON.parse(res.text).data

    expect(res.status).toBe(200)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(resData).toEqual(mockData.data)
  })
})

describe('GET /v1/kyc/scb/customer', () => {
  const originalConsole = { ...console }

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(async () => {
    jest.clearAllMocks()
    console.log = originalConsole.log
    console.warn = originalConsole.warn
    console.error = originalConsole.error
  })

  it('should return 400 with missing accessToken header', async () => {
    const requestHeader = { }

    const res = await request(app).get('/v1/kyc/scb/customer').set(requestHeader)
    const resDesc = JSON.parse(res.text).resDesc

    expect(res.status).toBe(400)
    expect(resDesc).toBe('Validation Error: accessToken header is required')
  })

  it('should return 500 with api token error', async () => {
    const requestHeader = { accessToken: '1234' }

    const mockError = { status: { code: 404, description: 'test scb error' } }
    mockedAxios.post.mockRejectedValueOnce(new ScbError(mockError))

    const res = await request(app).get('/v1/kyc/scb/customer').set(requestHeader)
    const resData = JSON.parse(res.text)

    expect(res.status).toBe(500)
    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(resData.resCode).toEqual(mockError.status.code)
    expect(resData.resDesc).toEqual('Scb Error: ' + mockError.status.description)
  })

  it('should return 500 with api customer error', async () => {
    const requestHeader = { accessToken: '1234' }

    const mockDataToken = { data: { accessToken: 'token' } }
    mockedAxios.post.mockResolvedValueOnce({ data: mockDataToken })

    const mockError = { status: { code: 404, description: 'test scb error' } }
    mockedAxios.get.mockRejectedValueOnce(new ScbError(mockError))

    const res = await request(app).get('/v1/kyc/scb/customer').set(requestHeader)
    const resData = JSON.parse(res.text)

    expect(res.status).toBe(500)
    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(resData.resCode).toEqual(mockError.status.code)
    expect(resData.resDesc).toEqual('Scb Error: ' + mockError.status.description)
  })

  it('should return 200 with responser', async () => {
    const requestHeader = { accessToken: '1234' }

    const mockDataToken = { data: { accessToken: 'token' } }
    mockedAxios.post.mockResolvedValueOnce({ data: mockDataToken })

    const mockDataCustomer = {
      data: {
        profile: {
          thaiTitle: 'thaiTitle',
          thaiFirstName: 'thaiFirstName',
          thaiLastName: 'thaiLastName',
          engTitle: 'engTitle',
          engFirstName: 'engFirstName',
          engLastName: 'engLastName',
          mobile: 'mobile',
          citizenID: 'citizenID',
          passportNumber: 'passportNumber',
          alienID: 'alienID',
          birthDate: 'birthDate',
          email: 'email',
          address: {
            countryCode: 'countryCode',
            thaiAddressThanon: 'thaiAddressThanon',
            thaiAddressProvince: 'thaiAddressProvince',
            zipCode: 'zipCode'
          }
        }
      }
    }
    mockedAxios.get.mockResolvedValueOnce({ data: mockDataCustomer })

    jest.spyOn(UserKeyModel, 'create').mockResolvedValue(null)

    const res = await request(app).get('/v1/kyc/scb/customer').set(requestHeader)
    const resData = JSON.parse(res.text).data

    expect(res.status).toBe(200)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(UserKeyModel.create).toHaveBeenCalledTimes(1)
    expect(resData).toHaveProperty('titleNameTh')
    expect(resData).toHaveProperty('firstNameTh')
    expect(resData).toHaveProperty('lastNameTh')
    expect(resData).toHaveProperty('titleNameEn')
    expect(resData).toHaveProperty('firstNameEn')
    expect(resData).toHaveProperty('lastNameEn')
    expect(resData).toHaveProperty('phoneNo')
    expect(resData).toHaveProperty('citizenId')
    expect(resData).toHaveProperty('passportNumber')
    expect(resData).toHaveProperty('alienId')
    expect(resData).toHaveProperty('birthDate')
    expect(resData).toHaveProperty('email')
    expect(resData).toHaveProperty('countryCode')
    expect(resData).toHaveProperty('address')
    expect(resData).toHaveProperty('postCode')
    expect(resData).toHaveProperty('jwePublicKey')
  })
})
