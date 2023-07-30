import React, { useEffect, useRef, useState } from 'react';
import classes from "./propertyDetail.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { request } from '../../util/fetchAPI';
import { FaBed, FaSquareFull } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import emailjs from "@emailjs/browser"


const PropertyDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const [propertyDetail, setPropertyDetail] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { id } = useParams();
  const formRef = useRef();


  const serviceId = "service_xxxxxx"
  const templateeId = "template_xxxxxxx"
  const publickey = "xxxxxxxxxxxxxxxxxxxxx"

  const ownerEmail = "habeebmustapha96@gmail.com"

  console.log(serviceId, templateeId, publickey);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await request(`/property/find/${id}`, 'GET')
        //const data = await axios.get(`https://localhost:5000"/property/find/${id}`)
        setPropertyDetail(data)
      }
      catch (error) {
        console.error(error)
      }
    }
    fetchDetails()
  }, [id])

  const handleCloseForm = () => {
    setShowForm(false);
    setTitle("")
    setDesc("")
  }

  const handleContactOwner = async (e) => {
    e.preventDefault();

    emailjs.sendForm(serviceId, templateeId, formRef.current, publickey)
      .then((result) => console.log(result))
      .catch((err) => console.log(err))
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          {<img src={`https://romax-real-estate.onrender.com/images/${propertyDetail?.img}`} alt='' />}
        </div>
        <div className={classes.right}>
          <h3 className={classes.title}>
            Title: {`${propertyDetail?.title}`}
          </h3>
          <div className={classes.detils}>
            <div className={classes.typeAndContinent}>
              <div>Type: <span>{`${propertyDetail?.type}`}</span></div>
              <div>Continent: <span>{`${propertyDetail?.continent}`}</span></div>
            </div>
            <div className={classes.priceAndOwner}>
              <span className={classes.price}><span>Price: ₦</span>{`${propertyDetail?.price}`}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                Owner:  <img src={`https://romax-real-estate.onrender.com/images/${propertyDetail?.currentOwner?.profileImg}`} className={classes.owner} alt='' />
              </span>
            </div>
            <div className={classes.moreDetails}>
              <span>{propertyDetail?.beds} <FaBed className={classes.icon} /></span>
              <span>{propertyDetail?.sqmeters} square meters <FaSquareFull className={classes.icon} />

              </span>
            </div>
          </div>
          <p className={classes.desc}>
            Desc: <span>{`${propertyDetail?.desc}`}</span>
          </p>
          <button onClick={() => setShowForm(true)} className={classes.contactOwner}>
            Contact Romax
          </button>
        </div>
        {
          showForm && (
            <div className={classes.contactForm} onClick={handleCloseForm}>
              <div className={classes.contactFormWrapper} onClick={(e) => e.stopPropagation()}>
                <h2>Send Email To Owner</h2>
                <form onSubmit={handleContactOwner} ref={formRef}>
                  <input value={user?.email} type="text" placeholder='My email' name="from_email" />
                  <input value={user?.username} type="text" placeholder='My username' name="from_username" />
                  <input value={ownerEmail} type="email" placeholder='Owner email' name="to_email" />
                  <input value={title} type="text" placeholder='Title' name="title" onChange={(e) => setTitle(e.target.value)} />
                  <input value={desc} type="text" placeholder='Desc' name="message" onChange={(e) => setDesc(e.target.value)} />
                  <button>Send</button>
                </form>
                <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default PropertyDetail