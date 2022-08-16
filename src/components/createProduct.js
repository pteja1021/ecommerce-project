import axios from 'axios'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useMutation} from '@tanstack/react-query'
import './createProductsStyling.css'
function CreateProduct(){
    const mutation=useMutation(newReview=>{
        return axios.post(`https://warm-hollows-91944.herokuapp.com/api/products/create`,newReview)
    })
    const formik=useFormik({
        initialValues : {
            name : "",
            description : "",
            category: "",
            image: "",
            price: "",
            quantity: "",
        },
        validationSchema:Yup.object({
            name: Yup.string().required(),
            description: Yup.string().required(),
            category: Yup.string().required(),
            image: Yup.string().required(),
            quantity: Yup.number().required(),
            price: Yup.number().required(),
        }),
        onSubmit: values => {
            mutation.mutate(
                {
                    "name": values.name,
                    "description": values.description,
                    "price": parseInt(values.price),
                    "category": values.category,
                    "image": values.image,
                    "quantity": parseInt(values.quantity),
                    "variants": []
                }
                ,
                {onSuccess: alert("product added")
            })
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
            <input id='description' name='description' className='productDetailsField' {...formik.getFieldProps('description')} placeholder='Description of the Product'/>
            {formik.touched.description && formik.errors.description ? (<div className='formik-errors'>{formik.errors.description}</div>) : null}

            <label htmlFor='category'/>
            <select id='category' name='category' className='productDetailsField' {...formik.getFieldProps('category')} placeholder='Category of the Product'>
                <option value='Kitchen'>Kitchen</option>
                <option value='Electronics'>Electronics</option>
                <option value='Education'>Education</option>
            </select>
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

            <button type='submit' className='CreateProductButton'>Create Product</button>
        </form>
    )
}
export default CreateProduct;