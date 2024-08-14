import{j as c}from"./jsx-runtime.7faW4zRM.js";import{r as e}from"./index.DhYZZe0J.js";import{u as z,f as $,M as B,a as O,P as S,L as U}from"./motion.DIEilGlj.js";function F(){const n=e.useRef(!1);return z(()=>(n.current=!0,()=>{n.current=!1}),[]),n}function b(){const n=F(),[s,C]=e.useState(0),r=e.useCallback(()=>{n.current&&C(s+1)},[s]);return[e.useCallback(()=>$.postRender(r),[r]),s]}class D extends e.Component{getSnapshotBeforeUpdate(s){const C=this.props.childRef.current;if(C&&s.isPresent&&!this.props.isPresent){const r=this.props.sizeRef.current;r.height=C.offsetHeight||0,r.width=C.offsetWidth||0,r.top=C.offsetTop,r.left=C.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function H({children:n,isPresent:s}){const C=e.useId(),r=e.useRef(null),h=e.useRef({width:0,height:0,top:0,left:0}),{nonce:l}=e.useContext(B);return e.useInsertionEffect(()=>{const{width:a,height:u,top:m,left:d}=h.current;if(s||!r.current||!a||!u)return;r.current.dataset.motionPopId=C;const t=document.createElement("style");return l&&(t.nonce=l),document.head.appendChild(t),t.sheet&&t.sheet.insertRule(`
          [data-motion-pop-id="${C}"] {
            position: absolute !important;
            width: ${a}px !important;
            height: ${u}px !important;
            top: ${m}px !important;
            left: ${d}px !important;
          }
        `),()=>{document.head.removeChild(t)}},[s]),c.jsx(D,{isPresent:s,childRef:r,sizeRef:h,children:e.cloneElement(n,{ref:r})})}const v=({children:n,initial:s,isPresent:C,onExitComplete:r,custom:h,presenceAffectsLayout:l,mode:a})=>{const u=O(T),m=e.useId(),d=e.useMemo(()=>({id:m,initial:s,isPresent:C,custom:h,onExitComplete:t=>{u.set(t,!0);for(const i of u.values())if(!i)return;r&&r()},register:t=>(u.set(t,!1),()=>u.delete(t))}),l?[Math.random()]:[C]);return e.useMemo(()=>{u.forEach((t,i)=>u.set(i,!1))},[C]),e.useEffect(()=>{!C&&!u.size&&r&&r()},[C]),a==="popLayout"&&(n=c.jsx(H,{isPresent:C,children:n})),c.jsx(S.Provider,{value:d,children:n})};function T(){return new Map}function Z(n){return e.useEffect(()=>()=>n(),[])}const p=n=>n.key||"";function A(n,s){n.forEach(C=>{const r=p(C);s.set(r,C)})}function G(n){const s=[];return e.Children.forEach(n,C=>{e.isValidElement(C)&&s.push(C)}),s}const _=({children:n,custom:s,initial:C=!0,onExitComplete:r,exitBeforeEnter:h,presenceAffectsLayout:l=!0,mode:a="sync"})=>{const u=e.useContext(U).forceRender||b()[0],m=F(),d=G(n);let t=d;const i=e.useRef(new Map).current,E=e.useRef(t),x=e.useRef(new Map).current,M=e.useRef(!0);if(z(()=>{M.current=!1,A(d,x),E.current=t}),Z(()=>{M.current=!0,x.clear(),i.clear()}),M.current)return c.jsx(c.Fragment,{children:t.map(o=>c.jsx(v,{isPresent:!0,initial:C?void 0:!1,presenceAffectsLayout:l,mode:a,children:o},p(o)))});t=[...t];const w=E.current.map(p),j=d.map(p),I=w.length;for(let o=0;o<I;o++){const f=w[o];j.indexOf(f)===-1&&!i.has(f)&&i.set(f,void 0)}return a==="wait"&&i.size&&(t=[]),i.forEach((o,f)=>{if(j.indexOf(f)!==-1)return;const y=x.get(f);if(!y)return;const k=w.indexOf(f);let g=o;if(!g){const K=()=>{i.delete(f);const L=Array.from(x.keys()).filter(R=>!j.includes(R));if(L.forEach(R=>x.delete(R)),E.current=d.filter(R=>{const P=p(R);return P===f||L.includes(P)}),!i.size){if(m.current===!1)return;u(),r&&r()}};g=c.jsx(v,{isPresent:!1,onExitComplete:K,custom:s,presenceAffectsLayout:l,mode:a,children:y},p(y)),i.set(f,g)}t.splice(k,0,g)}),t=t.map(o=>{const f=o.key;return i.has(f)?o:c.jsx(v,{isPresent:!0,presenceAffectsLayout:l,mode:a,children:o},p(o))}),c.jsx(c.Fragment,{children:i.size?t:t.map(o=>e.cloneElement(o))})},q=()=>c.jsxs("svg",{width:"40",height:"46",viewBox:"0 0 40 46",xmlns:"http://www.w3.org/2000/svg",className:"fill-primaryColor",children:[c.jsx("path",{d:"M19.5 13.121C19.1211 13.1592 18.8768 13.2484 18.4053 13.5414C18.2789 13.6178 18.1021 13.7197 18.0095 13.7749C17.9168 13.8301 17.5084 14.0637 17.1042 14.3015C16.7 14.5392 16.3084 14.7643 16.2368 14.8068C16.1653 14.845 16.0095 14.9341 15.8958 15.0063C15.7821 15.0743 15.4789 15.2526 15.2221 15.4055C14.6916 15.7155 14.5947 15.8259 14.6242 16.0806C14.6495 16.3227 14.7211 16.4034 15.1505 16.6496C15.3653 16.777 15.8368 17.053 16.1989 17.2696C16.5611 17.4862 16.9947 17.7367 17.1632 17.8344C17.3274 17.9278 17.5084 18.0339 17.5674 18.0721C17.6221 18.1146 17.6768 18.1443 17.6937 18.1443C17.7063 18.1443 17.8158 18.2038 17.9295 18.2845C18.1653 18.4331 18.3 18.5138 18.6158 18.6879C18.7295 18.7473 18.86 18.8237 18.9063 18.8535C18.9989 18.9129 19.0284 18.9299 19.8242 19.3927C20.1442 19.5796 20.5947 19.8471 20.8221 19.9872C21.0495 20.1231 21.2389 20.2377 21.2432 20.2377C21.2474 20.2377 21.3863 20.3142 21.5463 20.4076C21.7021 20.501 21.841 20.5774 21.8537 20.5774C21.8663 20.5774 21.9042 20.5987 21.9337 20.6326C21.9674 20.6624 22.1021 20.7473 22.2411 20.8195C22.3758 20.8917 22.6874 21.07 22.9316 21.2229C23.1758 21.3715 23.3863 21.4946 23.3989 21.4946C23.4116 21.4946 23.4621 21.5244 23.5168 21.5668C23.5716 21.605 23.6937 21.6772 23.7905 21.7324C23.9716 21.8343 24.0895 21.898 24.4516 22.1146C24.5779 22.191 24.8474 22.3481 25.0537 22.467C25.26 22.5859 25.4495 22.6963 25.4705 22.7133C25.4916 22.7303 25.6768 22.8407 25.8874 22.9596C26.0937 23.0827 26.3168 23.2059 26.38 23.2441C26.4432 23.2823 26.7589 23.4649 27.0789 23.6517C27.3989 23.8386 27.8789 24.1231 28.1484 24.2844C28.4137 24.4458 28.6368 24.5774 28.6453 24.5774C28.6537 24.5774 28.8263 24.6751 29.0284 24.7982C29.2305 24.9214 29.5 25.0785 29.6263 25.1464C29.7526 25.2186 30.0558 25.397 30.3042 25.5456C30.5526 25.6942 30.8305 25.8598 30.9274 25.915C31.02 25.9702 31.2895 26.1231 31.5295 26.2632C31.7653 26.3991 31.9632 26.5137 31.9716 26.5137C31.98 26.5137 32.0768 26.5732 32.1905 26.6454C32.3042 26.7176 32.4053 26.777 32.4179 26.777C32.4305 26.777 32.5568 26.8534 32.7042 26.9469C32.8516 27.0403 32.9779 27.1167 32.9905 27.1167C33.0242 27.1167 33.4368 27.4097 33.5379 27.5074C33.8453 27.8088 34.1021 28.2292 34.2368 28.6666C34.3084 28.9044 34.3295 29.0445 34.3295 29.38C34.3295 29.8853 34.2368 30.259 34.0137 30.6708C33.8453 30.9808 33.3358 31.5158 33.1042 31.6305C32.9611 31.6984 32.3716 32.0424 31.1421 32.7643C30.8516 32.9341 30.3674 33.2186 30.0684 33.3927C29.7653 33.5626 29.3232 33.8216 29.0832 33.9659C28.8432 34.1103 28.6284 34.2292 28.6158 34.2292C28.6032 34.2292 28.5442 34.2589 28.4895 34.3014C28.4347 34.3396 28.3253 34.4076 28.2537 34.45C28.1821 34.4925 28.0179 34.5817 27.8958 34.6538C27.4368 34.9256 26.9232 35.2186 26.9147 35.2186C26.9063 35.2186 26.7926 35.2865 26.6663 35.3672C26.5358 35.4521 26.3421 35.5668 26.2368 35.622C26.1358 35.6772 26.0221 35.7451 25.9926 35.7706C25.9632 35.7961 25.8663 35.8513 25.7863 35.8938C25.7021 35.9362 25.3358 36.14 24.9737 36.3566C24.2747 36.7685 24.2663 36.7727 23.9968 36.9214C23.9042 36.9766 23.7232 37.0827 23.5968 37.1591C23.2726 37.3587 22.5611 37.7664 21.5211 38.3693C20.8011 38.7855 20.7379 38.8067 20.2747 38.8279C19.6347 38.8577 19.4747 38.7982 18.2579 38.0848C18.1863 38.0424 17.9211 37.8853 17.6726 37.7409C17.4242 37.5965 17.1926 37.4649 17.1632 37.4521C17.1337 37.4352 17.0368 37.3842 16.9568 37.3332C16.6621 37.1507 16.4937 37.0487 15.3358 36.3778C14.6958 36.0042 14.1189 35.6687 14.0642 35.6305C14.0095 35.588 13.9505 35.5583 13.9379 35.5583C13.9253 35.5583 13.8453 35.5158 13.7737 35.4649C13.6979 35.4139 13.2979 35.1846 12.8811 34.9468C12.4642 34.709 11.9632 34.4203 11.7695 34.3014C11.5716 34.1783 11.3358 34.0381 11.2432 33.9872C10.7884 33.7324 10.2958 33.4437 9.68526 33.0742C9.31474 32.8492 8.92737 32.6199 8.82632 32.5689C8.57789 32.4415 6.90632 31.4776 6.64947 31.312C6.54 31.2398 6.44316 31.1846 6.42632 31.1846C6.41368 31.1846 6.24947 31.0955 6.06 30.9808C5.87053 30.8662 5.65579 30.743 5.58421 30.7006C5.12526 30.4373 4.41368 30.0254 4.17368 29.881C4.01368 29.7876 3.87895 29.7069 3.86632 29.7069C3.85368 29.7069 3.74 29.6432 3.60947 29.5583C3.48316 29.4776 3.0621 29.2314 2.67895 29.0105C1.97158 28.6071 1.91263 28.5732 1.52105 28.3354C1.39895 28.2632 1.23474 28.1698 1.15053 28.1231C1.06632 28.0806 0.923158 27.9957 0.830526 27.9447C0.737895 27.8895 0.611579 27.8428 0.556842 27.8428C0.396842 27.8428 0.156842 27.9829 0.110526 28.1018C0.0894737 28.157 0.0557895 28.2335 0.0347368 28.2674C-0.0115789 28.3566 -0.0115789 32.794 0.0347368 32.9723C0.0515789 33.0488 0.0894737 33.2059 0.118947 33.3205C0.173684 33.5795 0.371579 33.9702 0.556842 34.1952C0.813684 34.5095 1.00316 34.6454 1.75684 35.053C1.85789 35.1082 2.00105 35.1889 2.07684 35.2398C2.14842 35.2865 2.38 35.4224 2.58632 35.5413C2.79263 35.6645 3.10842 35.847 3.28105 35.949C3.45368 36.0509 3.60526 36.1358 3.61368 36.1358C3.6221 36.1358 3.68947 36.174 3.76947 36.225C3.84526 36.2759 4.03053 36.3821 4.17368 36.4628C4.32105 36.5392 4.46421 36.6284 4.49368 36.6538C4.52316 36.6793 4.70421 36.7812 4.88947 36.8831C5.07895 36.9808 5.31895 37.1209 5.42842 37.1931C5.53789 37.2653 5.63053 37.3205 5.64316 37.3205C5.65158 37.3205 5.74 37.3715 5.84526 37.4309C5.9421 37.4861 6.1021 37.5795 6.19474 37.6305C7.37789 38.3056 7.72737 38.5137 7.77789 38.5562C7.80737 38.5816 8.02211 38.709 8.24947 38.8322C8.48105 38.9596 8.83474 39.1591 9.04105 39.278C9.24737 39.4012 9.47895 39.5286 9.55053 39.571C9.62211 39.6135 10.0179 39.8428 10.4305 40.0848C11.1758 40.5137 11.2979 40.5859 11.6221 40.7727C11.7147 40.8279 11.8789 40.9171 11.98 40.9808C12.2326 41.1337 12.3632 41.2058 12.6705 41.3714C12.8095 41.4479 13.0537 41.5965 13.2053 41.6942C13.3611 41.7961 13.5 41.881 13.5168 41.881C13.5337 41.881 13.6432 41.9404 13.7568 42.0126C13.8705 42.0848 13.9716 42.1443 13.98 42.1443C13.9926 42.1443 14.1821 42.2504 14.4053 42.3778C14.6284 42.5052 14.8979 42.6581 14.9989 42.7175C15.1042 42.7727 15.3147 42.8959 15.4705 42.9893C15.7863 43.1804 16.9021 43.83 17.1884 43.9914C17.2937 44.0466 17.4663 44.1485 17.58 44.208C17.6895 44.2674 17.9463 44.416 18.1442 44.5392C18.7926 44.9298 19.3316 45.2228 19.5589 45.3077C19.8453 45.4054 20.3379 45.4436 20.6032 45.3842C20.8768 45.3247 21.1716 45.2016 21.4411 45.0487C21.5674 44.9808 21.6684 44.9213 21.6768 44.9213C21.6853 44.9213 21.8242 44.8407 21.9842 44.7472C22.4011 44.4925 22.5063 44.4373 22.8642 44.2377C23.0411 44.14 23.4453 43.9107 23.7653 43.7324C24.0811 43.5498 24.3463 43.4012 24.3547 43.4012C24.3632 43.4012 24.5021 43.3205 24.6621 43.2271C25.1463 42.9383 26.0684 42.4075 26.3589 42.2589C26.6158 42.1273 26.7295 42.0593 27.5211 41.5965C27.7105 41.4861 28.0726 41.278 28.3337 41.1337C28.5947 40.985 28.8937 40.8194 28.9947 40.76C29.1 40.7048 29.2937 40.5944 29.4284 40.5222C29.5632 40.4458 29.7189 40.3566 29.7737 40.3269C29.9042 40.2462 30.2495 40.0509 31.0326 39.6092C31.3863 39.4097 31.9126 39.1082 32.2032 38.9426C32.4937 38.777 32.8263 38.5859 32.94 38.5222C33.0537 38.4585 33.2137 38.3651 33.2853 38.3184C33.3653 38.2674 33.4326 38.2292 33.4453 38.2292C33.4537 38.2292 33.6263 38.1358 33.8284 38.0169C34.0347 37.8937 34.3295 37.7324 34.4853 37.6475C34.641 37.5625 34.8684 37.4309 34.9989 37.3545C35.1884 37.2313 36.2621 36.6284 37.1632 36.1273C37.2768 36.0679 37.4789 35.949 37.6179 35.8725C37.7526 35.7918 38.1442 35.571 38.4853 35.3757C39.2474 34.9383 39.4916 34.7133 39.7274 34.2292C40.001 33.6687 39.9968 33.7749 39.9968 29.5201C39.9968 26.3991 39.9884 25.69 39.9421 25.4692C39.7611 24.5647 39.4747 24.2335 38.2747 23.5329C37.8832 23.3036 37.2979 22.9596 36.9779 22.7643C36.6579 22.5732 36.3337 22.3821 36.2621 22.3396C36.1905 22.2972 36.0011 22.191 35.8453 22.1019C35.6895 22.0127 35.1968 21.7197 34.7505 21.4564C34.3042 21.1889 33.7189 20.8492 33.4579 20.6921C33.1968 20.535 32.7505 20.276 32.4768 20.1104C31.8621 19.7409 31.7737 19.69 31.4705 19.5159C31.1463 19.329 30.5989 19.0148 30.5232 18.9639C30.4853 18.9469 30.2832 18.8237 30.0684 18.7006C29.8537 18.5732 29.6095 18.4288 29.5253 18.3736C29.4411 18.3184 29.1295 18.1316 28.8263 17.9532C28.5232 17.7791 28.1779 17.5753 28.0516 17.5031C27.9253 17.431 27.7905 17.3503 27.7484 17.329C27.7063 17.3078 27.3653 17.0997 26.9947 16.8747C26.62 16.6454 26.2874 16.4501 26.2579 16.4288C26.1611 16.3736 25.1505 15.7919 24.9947 15.707C24.9105 15.6603 24.8011 15.5923 24.7505 15.5541C24.6705 15.4989 24.2579 15.2654 23.3147 14.7431C23.0874 14.6157 22.1232 14.0679 21.6179 13.7834C21.4411 13.6815 21.1842 13.5371 21.0453 13.4564C20.5316 13.1677 20.0937 13.0743 19.5253 13.121H19.5Z",fill:"#2F96D4"}),c.jsx("path",{d:"M19.2642 0.0509553C18.9695 0.123142 18.6663 0.280254 17.6347 0.883225C17.3653 1.04458 17.1379 1.17197 17.1253 1.17197C17.1168 1.17197 16.8558 1.31634 16.5526 1.49469C16.2453 1.67303 15.9842 1.81741 15.9674 1.81741C15.9421 1.81741 15.7021 1.95329 15.3947 2.14861C15.3147 2.19957 15.1968 2.27176 15.1295 2.30997C14.6032 2.60721 13.5589 3.1932 13.3316 3.32059C13.1758 3.40976 12.7505 3.6518 12.3884 3.85986C12.0263 4.06793 11.5758 4.31846 11.3905 4.42462C11.2053 4.52653 11.0074 4.63693 10.9568 4.6709C10.9021 4.70487 10.7463 4.79829 10.6074 4.87472C10.4684 4.95116 10.2916 5.04882 10.2116 5.09553C9.76105 5.35455 8.62421 5.99999 8.3 6.17833C8.09369 6.29298 7.81158 6.45009 7.67684 6.53077C7.38211 6.70487 7.19263 6.80678 6.93158 6.95115C6.82632 7.0106 6.66632 7.10402 6.58632 7.15497C6.50632 7.20593 6.43053 7.24839 6.42211 7.24839C6.40526 7.24839 5.71053 7.64329 3.87053 8.69212L3.76536 8.75183L3.65474 8.81463C3.10453 9.12698 2.62481 9.39907 2.53158 9.44796C1.34421 10.1019 0.94 10.3567 0.683158 10.6114C0.371579 10.9257 0.173684 11.2866 0.0726316 11.724C0.00947367 11.9957 0.00526315 12.293 0.00947368 15.9023C0.00947368 18.6624 0.0263158 19.8301 0.0557895 19.9532C0.0768421 20.0467 0.110526 20.174 0.123158 20.2377C0.14 20.2972 0.211579 20.4713 0.287368 20.6199C0.476842 20.9936 0.85579 21.3673 1.28947 21.6178C1.69368 21.8428 2.87263 22.5392 3.39053 22.8534C3.59263 22.9766 3.84105 23.121 3.9379 23.1719C4.03895 23.2271 4.42211 23.4522 4.79263 23.6772C5.16316 23.898 5.50842 24.1061 5.56737 24.1358C5.76105 24.2377 7.01158 24.9766 7.81158 25.4564C8.24105 25.7154 8.59895 25.9235 8.61158 25.9235C8.61956 25.9235 8.85049 26.0607 9.13611 26.2304L9.18421 26.259C9.49158 26.4458 9.9 26.6878 10.0937 26.8025C10.2874 26.9171 10.5358 27.0615 10.6411 27.1252C10.8937 27.2781 11.7779 27.7919 11.9505 27.8853C12.0221 27.9235 12.0895 27.9702 12.1021 27.9787C12.1147 27.9872 12.2832 28.0891 12.4811 28.1995C12.6789 28.3142 12.94 28.467 13.0663 28.5477C13.4411 28.7812 14.5989 29.4564 15.1421 29.7664C15.2263 29.8131 15.3358 29.881 15.3863 29.9192C15.4411 29.9532 15.6179 30.0551 15.7821 30.1485C15.9463 30.2377 16.2158 30.3863 16.3758 30.4755C16.54 30.5689 16.8432 30.7388 17.0537 30.8577C17.7484 31.2398 17.8579 31.3035 17.8958 31.329C17.9379 31.363 18.1274 31.4691 18.4432 31.6432C18.5568 31.7027 18.7463 31.8088 18.86 31.8768C19.4116 32.1953 19.6937 32.2802 20.2242 32.2802C20.7547 32.2802 21.0537 32.1783 21.8789 31.6815C22.3589 31.397 22.6916 31.1974 23.2937 30.8534C23.3779 30.8025 23.7779 30.5732 24.1821 30.3396C24.5863 30.1018 24.9779 29.8768 25.0537 29.8343C25.3358 29.6687 25.4411 29.346 25.2937 29.0955C25.2347 28.9936 25.0916 28.8959 24.4432 28.5222C24.3716 28.4798 24.0726 28.3057 23.7821 28.1316C23.4916 27.9617 23.0411 27.6942 22.7842 27.5456C22.5232 27.397 22.0137 27.0955 21.6516 26.8789C20.9484 26.4628 20.4011 26.1401 20.0726 25.9575C19.9632 25.898 19.7526 25.7706 19.6011 25.6815C19.4495 25.588 19.0495 25.3503 18.7084 25.1507C18.3632 24.9511 18.06 24.7685 18.0305 24.7515C18.0011 24.7345 17.7232 24.5689 17.4074 24.3864C17.1 24.2038 16.6916 23.966 16.5021 23.8598C16.3168 23.7494 15.9926 23.5626 15.7863 23.4394C15.58 23.3205 15.1716 23.0827 14.8811 22.9087C14.5905 22.7388 14.2832 22.5562 14.1989 22.5053C13.8242 22.2887 13.1421 21.8853 12.6158 21.5753C12.3084 21.3885 11.7989 21.087 11.4832 20.9087C11.1758 20.7261 10.8305 20.5265 10.7253 20.4628C10.54 20.3524 10.3716 20.2547 10.0053 20.0467C9.90421 19.9915 9.74 19.8895 9.63474 19.8216C9.53369 19.7579 9.20105 19.5583 8.89789 19.3842C6.71684 18.1231 6.48947 17.9745 6.22842 17.6263C5.74 16.9893 5.56737 16.2802 5.70211 15.5244C5.85368 14.6921 6.3379 14.0722 7.19684 13.5966C7.50421 13.4267 9.04947 12.5308 9.42421 12.3015C9.58 12.2123 9.78211 12.0891 9.87895 12.0339C10.4684 11.6942 11.5295 11.087 11.5758 11.0531C11.6432 11.0106 12.1695 10.7049 12.4053 10.5647C12.4979 10.5138 12.7716 10.3567 13.0074 10.2165C13.4621 9.94902 14.8558 9.13798 15.0832 9.00635C15.7526 8.62418 16.4768 8.19956 16.8432 7.983C16.9442 7.9193 17.1084 7.82588 17.2011 7.77493C17.2937 7.71973 17.5379 7.5796 17.7442 7.4607C19.2095 6.6072 19.3063 6.56899 19.8537 6.56899C20.0979 6.56899 20.2789 6.59022 20.4474 6.64542C20.7211 6.73034 21.7021 7.27387 23.2937 8.22079C23.82 8.53077 23.8074 8.52652 24.1989 8.74732C24.3632 8.84074 24.7253 9.04881 24.9905 9.20168C26.2874 9.95751 26.7168 10.208 27.0832 10.4246C27.3021 10.552 27.7568 10.8153 28.1021 11.0233C28.4474 11.2229 28.8937 11.4862 29.1 11.6093C29.3063 11.7282 29.5463 11.8641 29.6305 11.915C29.7147 11.966 29.9 12.0722 30.0474 12.1486C30.1905 12.2293 30.3842 12.3482 30.4768 12.4119L30.5102 12.4343C30.6776 12.5469 30.7658 12.6063 30.8726 12.6581C30.9147 12.6794 31.0495 12.7601 31.1758 12.8322C31.3021 12.9044 31.4958 13.0148 31.6095 13.07C31.7232 13.1295 31.9253 13.2441 32.0642 13.3248L32.1099 13.3507C32.2357 13.4221 32.3795 13.5036 32.4432 13.5414C32.5147 13.5838 32.6158 13.6475 32.6705 13.6815C32.7253 13.7197 32.9442 13.8471 33.1632 13.9702C33.3821 14.0934 33.7358 14.2972 33.9547 14.4246C34.1737 14.552 34.6284 14.8195 34.9737 15.0148C35.3189 15.2102 35.6221 15.3927 35.6516 15.414C35.6811 15.4395 35.8032 15.5116 35.9168 15.5753C36.1905 15.7282 38.0768 16.8195 38.3126 16.9639C38.8263 17.2738 39.3779 17.5668 39.4663 17.5668C39.6684 17.5668 39.8411 17.4607 39.9168 17.2908C39.9884 17.138 39.9926 17.0148 39.9926 14.8492C39.9926 12.3864 39.98 12.2335 39.7905 11.7537C39.639 11.3758 39.2305 10.9002 38.9105 10.7218C38.8516 10.6879 38.6874 10.5945 38.54 10.5095C38.3968 10.4204 38.1821 10.3015 38.0684 10.2378C37.4621 9.90231 36.9442 9.59658 36.8474 9.51165C36.7842 9.4607 36.6916 9.4055 36.6411 9.38427C36.5863 9.36728 36.4011 9.26537 36.2242 9.16771C36.0474 9.06579 35.8284 8.93841 35.7316 8.88745C35.639 8.8365 35.4537 8.73034 35.3147 8.64966C35.18 8.56898 35.0032 8.46707 34.919 8.42036C34.8347 8.36941 34.5147 8.18257 34.2032 7.99998C33.8958 7.81739 33.5632 7.62206 33.4705 7.57111C33.3779 7.51591 33.2179 7.42673 33.1211 7.37153C33.02 7.31208 32.9232 7.26113 32.9147 7.26113C32.9063 7.26113 32.7968 7.19743 32.679 7.11676C32.5611 7.04032 32.4179 6.95115 32.3547 6.91718C32.2958 6.88746 31.9 6.66665 31.4874 6.42461C31.0705 6.18682 30.4347 5.82164 30.0726 5.60933C29.7105 5.40551 29.399 5.22292 29.3737 5.20169C29.3316 5.16772 28.5947 4.74733 28.5779 4.74733C28.5695 4.74733 28.4853 4.69638 28.38 4.63693C28.2832 4.58173 28.1232 4.48407 28.0305 4.43311C27.9379 4.38215 27.6137 4.19107 27.2979 4.00848C26.9905 3.82589 26.6621 3.63906 26.5821 3.5881C25.4158 2.91719 25.1589 2.76857 25.0663 2.70488C25.0116 2.66241 24.7716 2.53503 24.7716 2.53503C24.6074 2.4501 22.1947 1.05732 21.6011 0.709128C20.8726 0.271762 20.5821 0.127388 20.2832 0.0509553C20.0263 -0.0169851 19.5674 -0.0169851 19.2895 0.0509553H19.2642Z",fill:"#2F96D4"})]});export{_ as A,q as S};