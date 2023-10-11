import React, { useRef, useState, useEffect,useContext } from 'react';
import AuthContext from '@/context/AuthProvider';
import axios from 'axios';
import styles from '@/styles/Login.module.css';
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from 'next/router';


const NavLink = styled(Link)`
color:#fff;
text-decoration:none;
`;


const Login = () => {
  const router = useRouter();
  const {setAuth} = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
    const response = await axios.post(
      "https://localhost:44374/api/Auth/login",
      { email: email, password: pwd },
     
    );
    const accessToken = response?.data?.token;
    setAuth({accessToken});
    setEmail('');
    setPwd('');
    setSuccess(true);
    setTimeout(() => {
      router.push('/');
    }, 3000);
    clearTimeout(router);
    } catch (err) {
    
        if(!err?.response){
            setErrMsg("Sunucudan Yanıt Alınamadı");
        }else if(err.response?.status === 400){
            setErrMsg('Yanlış Eposta veya Şifre');
        }else if(err.response?.status === 400){
            setErrMsg('Yetkisiz');
        } else{
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }      
  }

  return (
    <body className={`${styles.body}`}>
      {success ? (
       <section className={styles.section}>
          <h1 className={styles.a}>Giriş Başarılı</h1>
          <br />
          <p className={styles.a}>
            <NavLink href={"/"}>Anasayfaya yönlendiriliyorsunuz</NavLink>
          </p>
        </section>
      ) : (
        <>
          <section className={styles.section}>
            <p
              ref={errRef}
              className={`${errMsg ? styles.errmsg : styles.offscreen}`}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 className={styles.a}>Giriş Yap</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={(styles.label, styles.a)} htmlFor="email">
                Email:
              </label>
              <input
                className={styles.textarea}
                type="text"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <label className={(styles.label, styles.a)} htmlFor="password">
                Şifre:
              </label>
              <input
                className={styles.textarea}
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <button class={styles.button}>Giriş Yap</button>
              <p class={styles.a}>
                Hesabınız yok mu?
                <br />
                <span className="line">
                  <NavLink href={"/register"}>
                    Kayıt Ol
                  </NavLink>
                </span>
              </p>
            </form>
          </section>
        </>
      )}
    </body>
  );
};

export default Login;
