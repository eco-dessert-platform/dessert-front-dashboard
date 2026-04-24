export const CreateFormApiRequest = () => {
  return {
    storeId: 1,
    title: '두바인 쫀득 쿠키 5종',
    isFresh: true,
    productionStartTime: 'T_18_19',
    price: 15000,
    discountType: 'AMOUNT',
    discountValue: 3000,

    deliveryCondition: '유료',
    deliveryCompany: 'CJ대한통운',
    deliveryFee: 3000,
    freeShippingConditions: 50000,

    thumbnailImgFile: '(파일 업로드)',
    productImgs: ['(파일1)', '(파일2)', '(파일3)'],

    boardDetailRequest: {
      content:
        '<p>내일 오전 2시부터 4시까지 시스템 점검을 진행합니다.</p><img data-id="img-uuid-001.png" src="blob:temp"/>',
    },

    products: [
      {
        title: '두바이 쫀득 쿠키',
        category: 'COOKIE',
        plusPriceWithBoardPrice: 3000,
        stock: 1000,
        dietaryTags: {
          glutenFreeTag: false,
          highProteinTag: false,
          sugarFreeTag: false,
          veganTag: false,
          ketogenicTag: false,
        },
        availability: {
          monday: true,
          tuesday: false,
          wednesday: false,
          thursday: true,
          friday: false,
          saturday: false,
          sunday: false,
        },
        nutritionInfo: {
          totalWeight: 100,
          servingSize: 100,
          carbohydrates: 30,
          sugars: 10,
          protein: 5,
          fat: 3,
          calories: 300,
        },
      },
    ],

    productInfoNoticeRequest: {
      productName: '두바인 쫀득 쿠키 5종',
      foodType: '쿠키',
      manufacturer: '빵그리의 오븐',
      originLocation: '서울특별시 강남구',
      manufactureDate: '제조년월일 별도 표기',
      expirationDate: '소비기한 또는 품질 유지기한',
      storageGuide: '포장 단위 별 내용물의 용량 수량',
      packagingQuantityUnit: '포장 단위별 수량',
      rawMaterialName: '원재료명',
      nutritionInfo: '영양성분',
      transgenic: '유전자 변형 식품에 해당하는 경우의 표시',
      customerWaring: '소비자 안전을 위한 주의사항',
      importFood: '수입 식품의 경우',
    },
  }
}
