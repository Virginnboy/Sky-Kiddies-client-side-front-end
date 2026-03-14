import "../components/ProductDetails.css"
import { api } from "../api/axios"
import { useLoaderData } from "react-router-dom"
import { formattedCurrency } from "../store/formattedCurrency"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addToCart } from "../store/util"
import toast from "react-hot-toast"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ProductDetails = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const data = useLoaderData();
  
  const {mutate, isPending} = useMutation({
    mutationFn:addToCart,
    onSuccess: (res)=> {
      queryClient.invalidateQueries(['cart'])
      toast.success(res?.message)
    },
    onError: (err)=> {
      if(err.response?.status === 401) {
        navigate("/login")
      }
      console.log(err)
    }
  })

  const handleAddToCart =(productId)=> {
    mutate({productId})
  }

  return (
    <div className="prod-detail-container">
      {/* <main className="prod-detail-img-container">
        <img src={data?.images} alt="" />
      </main> */}
      <Swiper modules={[Pagination, Navigation]} pagination={{clickable: true}} navigation spaceBetween={20} slidesPerView={1}>
        {(data?.images || []).map((image)=> (
          <SwiperSlide key={image}>
            <img src={image} alt="data" />
          </SwiperSlide>
        ))}
      </Swiper>
      
      <main className="body-details">
        <div>
          <div className="prod-detail-title">
            <h2>{data?.title}</h2>
          </div>

          <div className="prod-detail-descrip">
            <p>{data?.description}</p>
          </div>

          <div className="prod-detail-price">
            <b>{formattedCurrency.format(data?.price)}</b>
          </div>
        </div>

        <div className="prod-btn-container">
          <button id="go-back" onClick={()=>navigate(-1)}>Go back</button>
          <button id="add-to-cart" onClick={()=>handleAddToCart(data._id)}>{isPending? "Adding..." : "Add To Cart"}</button>
        </div>
      </main>
    </div>
  )
}

export default ProductDetails

export const loader = async ({params}) => {
  const productId = params.productId

  try {
    const response = await api.get(`user/product-details/${productId}`);
    return response.data
  }catch(err) {
    console.log(err)
    throw new Error(err)
  }
}