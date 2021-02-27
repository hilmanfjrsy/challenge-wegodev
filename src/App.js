import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios'
import './App.css';
import moment from 'moment'
import logo from './assets/blank_image.png'
import 'bootstrap/dist/css/bootstrap.min.css';

const listCategory = ['Technology', 'Apple', 'Microsoft', 'Google', 'Netflix', 'Playstation', 'Samsung', 'Xiaomi', 'Asus']

export default function App() {
   const [category, setCategory] = useState('Technology')
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(false)

   async function getData() {
      try {
         setError(false)
         setLoading(true)
         await axios.get('https://newsapi.org/v2/everything?q=' + category + '&apiKey=13cd61f5fd174979a8a0cc3c94b3628d')
            .then(res => {
               setData(res.data.articles)
               setLoading(false)
            }).catch(err => {
               setError(true)
            })
      } catch (error) {
         setError(true)
      }
   }
   useEffect(() => {
      getData()
      console.log(category)
   }, [category])

   return (
      <div className="">
         <div className='text-center mt-2'>
            <i className="bi bi-newspaper" style={{ fontSize: 35, color: 'rgb(207, 82, 9)' }}></i>
            <span style={{ color: 'rgb(207, 82, 9)', fontSize: 35, marginLeft: 10, fontWeight: 'bold' }}>NEWS</span>
         </div>
         <div className='scrollx'>
            {listCategory.map((item, index) => {
               return (
                  <div key={item} style={{ marginRight: 10, marginLeft: index == 0 ? 10 : 0 }} className="category" onClick={() => setCategory(item)} >
                     {item}
                  </div>
               )
            })}
         </div>
         <RenderItem />
      </div >
   );

   function RenderItem() {
      if (error) {
         return (
            <div className="loading">
               <i className="bi bi-x-circle" style={{ fontSize: 80, color: 'firebrick' }}></i>
               <h5>Gagal mengambil data</h5>
               <div className="btn btn-warning" onClick={() => getData()} >
                  Refresh
               </div>
            </div>
         )
      }
      if (loading) {
         return (
            <div className="loading">
               <ReactLoading type={'spinningBubbles'} color={'rgb(207, 82, 9)'} height={80} width={80} />
               <p>Sedang mengambil data..</p>
            </div>
         )
      } else {
         return (
            <div className="App">
               {data.map((item, index) => {
                  return (
                     <div key={index} className='card'>
                        <div className='bg-img' style={{
                           backgroundImage: `url(${item.urlToImage == null ? logo : item.urlToImage})`,
                           height: 200
                        }}>
                           <div className="gradient">
                              <h5>{item.title}</h5>
                           </div>
                        </div>
                        <div className="container-desc">
                           <span style={{ color: 'rgb(207, 82, 9)', fontWeight: 700, fontSize: 14 }}>{moment(item.publishedAt).format('ddd, MMMM D, YYYY')}</span>
                           <span style={{ color: 'black', fontWeight: 700, fontSize: 14 }}>{item.author} | {item.source.name}</span>
                           <span style={{ color: 'grey', fontWeight: 700, fontSize: 12, marginTop: 20 }}>{item.description}</span>
                           <a href={item.url} style={{ color: 'rgb(207, 82, 9)', textDecorationLine: 'underline', alignSelf: 'flex-end', fontWeight: 700, fontSize: 16, marginTop: 20 }}>Go to website</a>
                        </div>
                     </div >
                  )
               })}
            </div >
         )
      }
   }
}