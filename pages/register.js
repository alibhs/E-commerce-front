import {useRef,useState,useEffect} from "react";
import React from "react";
import axios from "axios";
import styles from '@/styles/Login.module.css';
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from 'next/router';





const EMAIL_REGEX = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;
const NAME_REGEX = /^[a-zA-Z]+$/;;

const NavLink = styled(Link)`
color:#fff;
text-decoration:none;
`;

const Register = () => {
    const router = useRouter();
    const emailRef = useRef();
    const errRef = useRef();

    const[email,setEmail] = useState('');
    const[validEmail,setValidEmail] = useState(false);
    const[emailFocus,setEmailFocus] = useState(false);
    
    const [pwd,setPwd] = useState('');
    const [validPwd,setValidPwd] = useState(false);
    const [pwdFocus,setPwdFocus] = useState(false);

    const[firstname,setFirstName] = useState('');
    const[validFirstname,setValidFirstName] = useState(false);
    const[firstnameFocus,setFirstNameFocus] = useState(false);

    const[lastname,setLastName] = useState('');
    const[validLastname,setValidLastName] = useState(false);
    const[lastnameFocus,setLastNameFocus] = useState(false);


    const [matchPwd,setMatchPwd] = useState('');
    const [validMatch,setValidMatch] = useState(false);
    const [matchFocus,setMatchFocus] = useState(false);

    const [errMsg,setErrMsg] = useState('');
    const [success,setSuccess] = useState(false);

    useEffect(()=>{
        emailRef.current.focus();
    },[])

    useEffect(()=>{
        setValidEmail(EMAIL_REGEX.test(email));
    },[email])


    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]); 

    useEffect(()=>{
        setErrMsg('');
    },[email,pwd,matchPwd])
    
    const handleSubmit = async (e) => {
      debugger
        e.preventDefault();
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd); 
        const v3 = NAME_REGEX.test(firstname);  
        if (!v1 || !v2 ||!v3) {
            setErrMsg("Geçersiz Giriş");
            return;
        }
        try {
          const response = await axios.post(
            "https://localhost:44374/api/Auth/register",
            { email: email, password: pwd, firstname:firstname,lastname:lastname },
          );
          setSuccess(true);
          setTimeout(() => {
            router.push('/');
          }, 3000);
        clearTimeout(router);
        } catch (err) {
          if (!err?.response) {
            setErrMsg("Sunucudan Yanıt Alınamadı");
          } else if (err.response?.status === 409) {
            setErrMsg("E-posta Zaten Alınmış");
          } else {
            setErrMsg("Kayıt Başarısız");
          }
          errRef.current.focus();
        }
    }

  return (
    <>
      {success ? (
        <div className={styles.body}>
          <section className={`${styles.section}`}>
            <h1 className={styles.a}>Kayıt Başarılı</h1>
            <p>
              <NavLink href={"/"}>Anasayfaya yönlendiriliyorsunuz</NavLink>
            </p>
          </section>
        </div>
      ) : (
        <div className={styles.body}>
          <section className={`${styles.section}`}>
            <p
              ref={errRef}
              className={`${errMsg ? styles.errmsg : styles.offscreen}`}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 className={styles.a}>Kayıt Ol</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label
                className={`${styles.label} ${styles.a}`}
                htmlFor="firstname"
              >
                Adınız:
              </label>
              <input
                className={styles.textarea}
                type="text"
                id="firstname"
                onChange={(e) => setFirstName(e.target.value)}
                required
                aria-invalid={`${errMsg ? styles.errmsg : styles.offscreen}`}
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
              />

              <label
                className={`${styles.label} ${styles.a}`}
                htmlFor="lastname"
              >
                Soyadınız:
              </label>
              <input
                className={styles.textarea}
                type="text"
                id="lastname"
                onChange={(e) => setLastName(e.target.value)}
                required
                aria-invalid={`${
                  validFirstname ? styles.errmsg : styles.offscreen
                }`}
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
              />

              <label className={`${styles.label} ${styles.a}`} htmlFor="email">
                Email:
                <span
                  className={`${validEmail ? styles.valid : styles.hide}`}
                ></span>
                <span
                  className={`${
                    validEmail || !email ? styles.hide : styles.invalid
                  }`}
                ></span>
              </label>
              <input
                className={styles.textarea}
                type="text"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="uidnote"
                className={`${
                  emailFocus && email && !validEmail
                    ? styles.instructions
                    : styles.offscreen
                } ${styles.a}`}
              >
                @ işareti bulunamlıdır. <br />
              </p>

              <label
                className={`${styles.label} ${styles.a}`}
                htmlFor="password"
              >
                Şifre:
                <span
                  className={`${validPwd ? styles.valid : styles.hide}`}
                ></span>
                <span
                  className={`${
                    validPwd || !pwd ? styles.hide : styles.invalid
                  }`}
                ></span>
              </label>
              <input
                className={styles.textarea}
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />

              <p
                id="pwdnote"
                className={`${
                  pwdFocus && !validPwd ? styles.instructions : styles.offscreen
                } ${styles.a}`}
              >
                8 karakterden fazla olmalıdır.
                <br />
                Büyük harf küçük harf sayı ve özel karakter içermelidir.
                <br />
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </p>

              <label
                className={`${styles.label} ${styles.a}`}
                htmlFor="confirm_pwd"
              >
                Şifreyi Tekrarla:
                <span
                  className={`${
                    validMatch && matchPwd ? styles.valid : styles.hide
                  }`}
                ></span>
                <span
                  className={`${
                    validMatch && matchPwd ? styles.hide : styles.invalid
                  }`}
                ></span>
              </label>
              <input
                className={styles.textarea}
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />

              <p
                id="confirmnote"
                className={`${
                  matchFocus && !validMatch
                    ? styles.instructions
                    : styles.offscreen
                } ${styles.a}`}
              >
                Girilen iki şifre aynı olmalıdır.
                <br />
              </p>

              <button
                className={styles.button}
                disabled={
                  !validEmail || !validPwd || !validMatch ? true : false
                }
              >
                Kayıt Ol
              </button>
            </form>
            <p className={styles.a}>
              Hesabınız Var Mı? <br />
              <span className={styles.line}>
                <NavLink href={"/login"}>Giriş Yap</NavLink>
              </span>
            </p>
          </section>
        </div>
      )}
    </>
  );
}

export default Register;
