import axios from 'axios'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import {useMutation} from '@tanstack/react-query'
import './createProductsStyling.css'
function CreateProduct(){
    const [variantNumberState,setVariantNumber]=useState(0);
    const mutation=useMutation(newReview=>{
        return axios.post(`http://morning-waters-03754.herokuapp.com/api/products/create`,newReview)
    })
    const formik=useFormik({
        initialValues : {
            name : "",
            description : "",
            category: "",
            image: "",
            variants: Array(variantNumberState).map(v=>{
                return { "color":"" ,"image":""}
            })
        },
        validationSchema:Yup.object({
            name: Yup.string().required(),
            description: Yup.string(),
            category: Yup.string().required(),
            image: Yup.string().required(),
            quantity: Yup.number().required(),
            price: Yup.number().required(),
            variants_number: Yup.number().required().min(0),
        }),
        onSubmit: values => {
            mutation.mutate(JSON.stringify(values),{onSuccess: alert("product added")})
            values.name=""
            values.description=""
            values.category= ""
            values.image= ""
            values.quantity= 0
            values.price= 0
        }
    })
    return (
        <form className='productDetailsForm' autoComplete='off' onSubmit={formik.handleSubmit}>
            <label htmlFor='name'/>
            <input id='name' name='name' className='productDetailsField' {...formik.getFieldProps('name')} placeholder='Name of the Product'/>
            {formik.touched.name && formik.errors.name ? (<div className='formik-errors'>{formik.errors.name}</div>) : null}

            <label htmlFor='description'/>
            <input id='description' name='description' className='productDetailsField' {...formik.getFieldProps('desctiption')} placeholder='Description of the Product'/>
            {formik.touched.description && formik.errors.description ? (<div className='formik-errors'>{formik.errors.description}</div>) : null}

            <label htmlFor='category'/>
            <input id='category' name='category' className='productDetailsField' {...formik.getFieldProps('category')} placeholder='Category of the Product'/>
            {formik.touched.category && formik.errors.category ? (<div className='formik-errors'>{formik.errors.category}</div>) : null}

            <label htmlFor='image'/>
            <input id='image' name='image' className='productDetailsField' {...formik.getFieldProps('image')} placeholder='Link to the image of the Product'/>
            {formik.touched.image && formik.errors.image ? (<div className='formik-errors'>{formik.errors.image}</div>) : null}

            <label htmlFor='quantity'/>
            <input id='quantity' name='quantity' className='productDetailsField' {...formik.getFieldProps('quantity')} placeholder='Quantity of the Product'/>
            {formik.touched.quantity && formik.errors.quantity ? (<div className='formik-errors'>{formik.errors.quantity}</div>) : null}

            <label htmlFor='price'/>
            <input id='price' name='price' className='productDetailsField' {...formik.getFieldProps('price')} placeholder='Price of the Product'/>
            {formik.touched.price && formik.errors.price ? (<div className='formik-errors'>{formik.errors.price}</div>) : null}

            <label htmlFor='variants_number'/>
            <input name='variants_number' id='variants_number' type='number' className='productDetailsField' value={variantNumberState} onChange={(e)=>{setVariantNumber(parseInt(e.target.value))}} placeholder='Number of variants'/>

            {variantNumberState && variantNumberState>0 ? Array(variantNumberState).map((variant)=>{
                return (
                    <>
                    <label htmlFor={`variant_color ${variant}`}/>
                    <input name='variant_color' id='variant_color' className='productDetailsField' placeholder='color' {...formik.getFieldProps('variants')[variant]['color']}/>
                    <label htmlFor='variant_image'/>
                    <input name='variant_image' id='variant_image' className='productDetailsField' placeholder='variant image' {...formik.getFieldProps('variants')[variant]['image']}/>
                    </>
                )
            }) : null}

            <button type='submit' className='CreateProductButton'>Create Product</button>
        </form>
    )
}
export default CreateProduct;