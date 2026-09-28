import { describe, expect, it } from 'vitest'

import {
  createStoreRegistrationFormSchema,
  toStoreDetailRequest,
  toStoreRegistrationFormValues,
  updateStoreRegistrationFormSchema,
} from './store-registration-form.schema'

import type { StoreRegistrationFormValues } from './store-registration-form.schema'

// 체크섬이 맞는 사업자등록번호
const VALID_BUSINESS_NUMBER = '123-45-67891'

const profileImage = new File(['png-bytes'], 'profile.png', {
  type: 'image/png',
})

const validValues: StoreRegistrationFormValues = {
  profileImage,
  storeName: '빵그리 베이커리',
  identifier: VALID_BUSINESS_NUMBER,
  introduce: '건강한 디저트를 만듭니다',
  phoneNumber: '01012345678',
  subPhoneNumber: '',
  emailLocal: 'store',
  emailDomain: 'example.com',
  postalCode: '04790',
  originAddress: '서울시 성동구',
  originAddressDetail: '1층',
}

const getErrorMessages = (values: StoreRegistrationFormValues) => {
  const result = createStoreRegistrationFormSchema.safeParse(values)
  return result.success ? [] : result.error.issues.map((issue) => issue.message)
}

describe('스토어 등록 폼 검증', () => {
  it('올바른 값이면 통과하고 사업자등록번호를 숫자만 남긴다', () => {
    const result = createStoreRegistrationFormSchema.safeParse(validValues)

    expect(result.success).toBe(true)
    expect(result.data?.identifier).toBe('1234567891')
  })

  it('체크섬이 맞지 않는 사업자등록번호를 거부한다', () => {
    expect(
      getErrorMessages({ ...validValues, identifier: '1234567890' }),
    ).toContain('유효하지 않은 사업자등록번호입니다')
  })

  it('형식이 다른 사업자등록번호를 거부한다', () => {
    expect(
      getErrorMessages({ ...validValues, identifier: '12-345' }),
    ).toContain('사업자등록번호는 10자리 숫자로 입력해주세요')
  })

  it('스토어명은 3~50자만 허용한다', () => {
    expect(getErrorMessages({ ...validValues, storeName: '빵집' })).toContain(
      '스토어명은 3자 이상 입력해주세요',
    )
    expect(
      getErrorMessages({ ...validValues, storeName: '빵'.repeat(51) }),
    ).toContain('스토어명은 50자 이하로 입력해주세요')
  })

  it('연락처는 숫자 9~11자리만 허용하고, 보조 연락처는 비워둘 수 있다', () => {
    expect(
      getErrorMessages({ ...validValues, phoneNumber: '010-1234-5678' }),
    ).toContain('숫자만 9~11자리로 입력해주세요')
    expect(getErrorMessages({ ...validValues, subPhoneNumber: '' })).toEqual([])
    expect(
      getErrorMessages({ ...validValues, subPhoneNumber: '0101234' }),
    ).toContain('숫자만 9~11자리로 입력해주세요')
  })

  it('이메일 도메인 형식이 맞지 않으면 거부한다', () => {
    expect(
      getErrorMessages({ ...validValues, emailDomain: 'example' }),
    ).toContain('이메일 도메인 형식이 올바르지 않습니다')
  })

  it('등록 시에는 프로필 이미지가 필수이고 jpg·png 10MB 이하만 허용한다', () => {
    const imageError = 'jpg, jpeg, png 형식의 10MB 이하 이미지를 등록해주세요'

    expect(getErrorMessages({ ...validValues, profileImage: null })).toContain(
      imageError,
    )
    expect(
      getErrorMessages({
        ...validValues,
        profileImage: new File(['gif'], 'profile.gif', { type: 'image/gif' }),
      }),
    ).toContain(imageError)
  })

  it('수정 시에는 프로필 이미지를 비워둘 수 있다', () => {
    const result = updateStoreRegistrationFormSchema.safeParse({
      ...validValues,
      profileImage: null,
    })

    expect(result.success).toBe(true)
  })
})

describe('폼 값과 API 요청 변환', () => {
  it('폼 값을 API 요청으로 바꾸며 우편번호를 주소 앞에 붙이고 빈 보조 연락처는 null로 보낸다', () => {
    expect(toStoreDetailRequest(validValues)).toEqual({
      storeName: '빵그리 베이커리',
      identifier: '1234567891',
      introduce: '건강한 디저트를 만듭니다',
      phoneNumber: '01012345678',
      subPhoneNumber: null,
      email: 'store@example.com',
      originAddress: '(04790) 서울시 성동구',
      originAddressDetail: '1층',
    })
  })

  it('우편번호가 없으면 주소만 보낸다', () => {
    expect(
      toStoreDetailRequest({ ...validValues, postalCode: '' }).originAddress,
    ).toBe('서울시 성동구')
  })

  it('목록 데이터를 수정 폼 값으로 되돌리며 이메일과 우편번호를 나눈다', () => {
    const formValues = toStoreRegistrationFormValues({
      id: 31,
      storeName: '빵그리 베이커리',
      businessNumber: '123-45-67891',
      introduction: '건강한 디저트를 만듭니다',
      phone: '010-1234-5678',
      subPhoneNumber: '',
      email: 'store@example.com',
      baseAddress: '(04790) 서울시 성동구',
      detailAddress: '1층',
    })

    expect(formValues).toMatchObject({
      identifier: '1234567891',
      phoneNumber: '01012345678',
      emailLocal: 'store',
      emailDomain: 'example.com',
      postalCode: '04790',
      originAddress: '서울시 성동구',
      profileImage: null,
    })
  })

  it('폼 값 → 요청 → 폼 값으로 왕복해도 주소가 유지된다', () => {
    const request = toStoreDetailRequest(validValues)
    const roundTrip = toStoreRegistrationFormValues({
      id: 31,
      storeName: request.storeName,
      businessNumber: request.identifier,
      introduction: request.introduce,
      phone: request.phoneNumber,
      subPhoneNumber: request.subPhoneNumber ?? '',
      email: request.email,
      baseAddress: request.originAddress,
      detailAddress: request.originAddressDetail,
    })

    expect(roundTrip.postalCode).toBe('04790')
    expect(roundTrip.originAddress).toBe('서울시 성동구')
  })
})
