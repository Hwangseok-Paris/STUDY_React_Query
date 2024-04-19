import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { v4 as uuid } from 'uuid';

const fetchProducts = () => {
  return axios.get("https://api.sampleapis.com/wines/reds");
};


const addProduct = (product) => {
  return axios.post(
    "http://localhost:3001/api", product
  )
}

// export const useAddProduct = () => {
//   return useMutation(addProduct)
// }

export const useAddProduct = () => {
  const queryClient = useQueryClient()
  return useMutation(addProduct, {
    // onSuccess: data => {
    //   console.log(data.data)
    //   queryClient.invalidateQueries('get-product')
    //   queryClient.setQueryData('get-product', oldProductData => {

    //     console.log(oldProductData)
    //     return {
    //       ...oldProductData,
    //       data: [...oldProductData.data, data.data],
    //     }
    //   })
    // }

    onMutate: async (newProduct) => {
      await queryClient.cancelQueries("get-product")  // fetch 중지
      const previousProductData = queryClient.getQueryData("get-product") // 이전 데이터
      console.log(previousProductData)
      queryClient.setQueryData("get-product", (oldProductData) => {
        return {
          ...oldProductData,
          data: [...oldProductData.data, {id: uuid(), ...newProduct}]
        }
      })

      return {
        previousProductData,
      }
    },
    // 에러 발생시 이전 데이터로 복구
    onError: (_error, _product, context) => {
      queryClient.setQueryData('get-product', context.previousProductData)
    },
    // POST action 에서 에러가 발생했거나 성공을 했을 때 실행하는 항목
    onSettled: () => {
      queryClient.invalidateQueries('get-product')
    }

  })
}


// onSuccess, onError 는 이 함수를 호출하는 컴포넌트에서 호출하는게 용이함.
export const useProductName = (onSuccess, onError) => {
  return useQuery("get-product", fetchProducts, {
    onSuccess: onSuccess,
    onError: onError,
    // select: (data) => {
    //   const productName = data.data?.map((p) => p.wine).slice(0, 9);
    //   return productName;
    // },
    select: (data) => {
      return data.data.slice(0, 9);
    },
  });
};
