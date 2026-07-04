import{a as e,i as t,n,o as r,r as i,t as a}from"./index-DbkxJQuZ.js";var o=r(e(),1),s=t();i.registerPlugin(n);function c({children:e,className:t=``,stagger:n=.14}){let r=(0,o.useRef)(null);return(0,o.useEffect)(()=>{let e=r.current;if(!e)return;let t=Array.from(e.children),a=i.context(()=>{i.fromTo(t,{y:70,opacity:0,scale:.96,filter:`blur(10px)`},{y:0,opacity:1,scale:1,filter:`blur(0px)`,duration:1.15,stagger:n,ease:`power4.out`,scrollTrigger:{trigger:e,start:`top 82%`,toggleActions:`play none none reverse`}})},e);return()=>a.revert()},[n]),(0,s.jsx)(`div`,{ref:r,className:t,children:e})}i.registerPlugin(n);function l(){let e=(0,o.useRef)(null),t=(0,o.useRef)(null),n=(0,o.useRef)(null),r=(0,o.useRef)(null);return(0,o.useEffect)(()=>{let a=e.current,o=t.current,s=n.current,c=i.context(()=>{i.fromTo(r.current,{y:120,opacity:0,filter:`blur(18px)`},{y:0,opacity:1,filter:`blur(0px)`,duration:1.4,ease:`power4.out`,scrollTrigger:{trigger:a,start:`top 75%`}}),i.to(o,{backgroundPositionX:`180px`,backgroundPositionY:`320px`,rotation:.6,scale:1.08,ease:`none`,scrollTrigger:{trigger:a,start:`top bottom`,end:`bottom top`,scrub:1.8}}),i.to(s,{yPercent:30,scale:1.2,ease:`none`,scrollTrigger:{trigger:a,start:`top bottom`,end:`bottom top`,scrub:2}})},a);function l(e){let t=e.clientX/window.innerWidth-.5,n=e.clientY/window.innerHeight-.5;i.to(o,{x:t*35,y:n*25,rotationX:n*-1.2,rotationY:t*1.2,duration:2.2,ease:`power3.out`,overwrite:`auto`}),i.to(s,{x:t*90,y:n*35,duration:3,ease:`power3.out`,overwrite:`auto`})}return window.addEventListener(`mousemove`,l),()=>{window.removeEventListener(`mousemove`,l),c.revert()}},[]),(0,s.jsxs)(`section`,{ref:e,className:`\r
        relative\r
        z-40\r
        min-h-[130vh]\r
        overflow-hidden\r
        bg-[#090909]\r
        text-white\r
      `,children:[(0,s.jsx)(`div`,{className:`\r
    pointer-events-none\r
    absolute\r
    left-0\r
    right-0\r
    top-0\r
    z-[5]\r
\r
    h-48\r
\r
    bg-gradient-to-b\r
    from-black\r
    via-black/50\r
    to-transparent\r
  `}),(0,s.jsx)(`div`,{ref:n,className:`\r
          pointer-events-none\r
          absolute\r
          -left-[10%]\r
          top-[-10%]\r
          h-[1000px]\r
          w-[1200px]\r
          rounded-full\r
          blur-[120px]\r
          will-change-transform\r
        `,style:{background:`
            radial-gradient(
              circle at 35% 40%,
              rgba(255, 170, 0, 0.42),
              rgba(190, 55, 20, 0.30) 35%,
              rgba(100, 15, 80, 0.18) 58%,
              transparent 75%
            )
          `}}),(0,s.jsx)(`div`,{className:`\r
          pointer-events-none\r
          absolute\r
          right-[-20%]\r
          top-[5%]\r
          h-[800px]\r
          w-[900px]\r
          rounded-full\r
          blur-[140px]\r
        `,style:{background:`
            radial-gradient(
              circle,
              rgba(170, 20, 75, 0.28),
              transparent 70%
            )
          `}}),(0,s.jsx)(`div`,{ref:t,className:`\r
    pointer-events-none\r
    absolute\r
    -inset-[180px]\r
    opacity-[0.50]\r
    will-change-transform\r
  `,style:{backgroundImage:`
      linear-gradient(
        rgba(255,255,255,0.16) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255,255,255,0.16) 1px,
        transparent 1px
      )
    `,backgroundSize:`90px 90px`,transformOrigin:`center center`,transformStyle:`preserve-3d`}}),(0,s.jsx)(`div`,{className:`\r
    pointer-events-none\r
    absolute\r
    inset-0\r
    z-[1]\r
\r
    bg-gradient-to-b\r
    from-[#090909]/70\r
    via-transparent\r
    to-[#090909]/80\r
  `}),(0,s.jsx)(`div`,{className:`\r
          pointer-events-none\r
          absolute\r
          inset-0\r
          bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.72)_100%)]\r
        `}),(0,s.jsxs)(`div`,{className:`relative z-10`,children:[(0,s.jsx)(`section`,{className:`\r
            flex\r
            min-h-screen\r
            flex-col\r
            justify-center\r
            px-6\r
            py-32\r
            md:px-12\r
            lg:px-20\r
          `,children:(0,s.jsxs)(`div`,{className:`mx-auto w-full max-w-7xl`,children:[(0,s.jsxs)(`div`,{className:`text-center`,children:[(0,s.jsx)(`p`,{className:`\r
                  font-mono\r
                  text-[9px]\r
                  uppercase\r
                  tracking-[0.35em]\r
                  text-white/45\r
                `,children:`Engine Specifications`}),(0,s.jsxs)(`h2`,{ref:r,className:`\r
    display-heading\r
\r
    mt-5\r
\r
    text-[clamp(3rem,6vw,6.5rem)]\r
\r
    leading-[1.02]\r
\r
    tracking-[-0.055em]\r
  `,children:[(0,s.jsx)(a,{children:(0,s.jsx)(`span`,{className:`block`,children:`Built for sound`})}),(0,s.jsx)(a,{delay:.08,children:(0,s.jsx)(`span`,{className:`\r
        mt-2\r
        block\r
\r
        text-white/40\r
\r
        md:mt-3\r
      `,children:`without compromise.`})})]})]}),(0,s.jsxs)(c,{className:`\r
                mt-20\r
                grid\r
                gap-4\r
                lg:grid-cols-3\r
              `,children:[(0,s.jsx)(u,{number:`01`,tag:`PCM 24-BIT`,title:`Neural Music Synthesis`,image:`/images/features/neural-synthesis.png`,children:`Generate lossless linear PCM audio with direct-to-audio neural diffusion built for high-detail composition.`}),(0,s.jsx)(u,{number:`02`,tag:`VOCAL DIT`,title:`Consistent Singer Profiles`,image:`/images/features/singer-profile.png`,children:`Build specialized vocal identities that remain coherent across lyrics, genres and complete releases.`}),(0,s.jsx)(u,{number:`03`,tag:`WEBGL NODE`,title:`Turntable Audition`,image:`/images/features/dj.png`,children:`Explore, playback and shape your generated compositions through an interactive visual listening environment.`})]})]})}),(0,s.jsx)(`section`,{className:`\r
            min-h-screen\r
            px-6\r
            py-32\r
            md:px-12\r
            lg:px-20\r
          `,children:(0,s.jsxs)(`div`,{className:`mx-auto max-w-7xl`,children:[(0,s.jsxs)(`div`,{className:`text-center`,children:[(0,s.jsx)(`p`,{className:`\r
                  font-mono\r
                  text-[9px]\r
                  uppercase\r
                  tracking-[0.35em]\r
                  text-white/45\r
                `,children:`Wall of Sound`}),(0,s.jsxs)(`h2`,{className:`\r
                  mt-5\r
                  text-[clamp(3rem,6vw,6.5rem)]\r
                  font-medium\r
                  leading-[0.9]\r
                  tracking-[-0.06em]\r
                `,children:[(0,s.jsx)(a,{children:`Made for people`}),(0,s.jsx)(`br`,{}),(0,s.jsx)(a,{delay:.08,children:(0,s.jsx)(`span`,{className:`text-white/40`,children:`who hear differently.`})})]})]}),(0,s.jsxs)(c,{className:`\r
                mt-20\r
                grid\r
                gap-4\r
                lg:grid-cols-3\r
              `,children:[(0,s.jsx)(d,{initials:`AK`,name:`Alex K.`,role:`Producer`,children:`“The vocal consistency is unmatched. I built an entire EP around one singer profile, and every track feels like it came from the same recording session.”`}),(0,s.jsx)(d,{initials:`SJ`,name:`Sarah J.`,role:`Game Designer`,children:`“I needed soundtracks that could follow different worlds and moods. The engine gets remarkably close to what I hear in my head.”`}),(0,s.jsx)(d,{initials:`MD`,name:`Marcus D.`,role:`Sound Engineer`,children:`“The high-fidelity output means I can move straight into my production workflow instead of fighting artifacts first.”`})]})]})})]}),(0,s.jsxs)(`div`,{className:`\r
          relative\r
          z-10\r
          flex\r
          h-[30vh]\r
          items-end\r
          justify-between\r
          border-t\r
          border-white/15\r
          px-8\r
          pb-8\r
          font-mono\r
          text-[9px]\r
          uppercase\r
          tracking-[0.3em]\r
          text-white/40\r
          md:px-14\r
        `,children:[(0,s.jsx)(`span`,{children:`Scroll to explore`}),(0,s.jsx)(`span`,{children:`01 / Creation Engine`})]})]})}function u({number:e,tag:t,title:n,image:r,children:i}){return(0,s.jsxs)(`article`,{className:`\r
        group\r
        relative\r
        min-h-[500px]\r
        overflow-hidden\r
\r
        rounded-[2rem]\r
\r
        border\r
        border-white/15\r
\r
        bg-black/40\r
\r
        p-5\r
\r
        backdrop-blur-xl\r
\r
        transition-all\r
        duration-700\r
\r
        hover:-translate-y-2\r
        hover:border-white/30\r
\r
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)]\r
      `,children:[(0,s.jsx)(`div`,{className:`\r
          pointer-events-none\r
          absolute\r
          inset-0\r
\r
          bg-gradient-to-br\r
          from-white/[0.08]\r
          via-white/[0.025]\r
          to-transparent\r
\r
          opacity-100\r
\r
          transition-opacity\r
          duration-700\r
\r
          group-hover:opacity-20\r
        `}),(0,s.jsx)(`div`,{className:`\r
          pointer-events-none\r
          absolute\r
          inset-0\r
\r
          opacity-0\r
\r
          transition-all\r
          duration-1000\r
\r
          group-hover:scale-110\r
          group-hover:opacity-100\r
        `,style:{background:{"01":`
      radial-gradient(
        circle at 20% 20%,
        rgba(255, 176, 46, 0.38),
        transparent 38%
      ),
      radial-gradient(
        circle at 85% 75%,
        rgba(181, 44, 24, 0.30),
        transparent 48%
      )
    `,"02":`
      radial-gradient(
        circle at 75% 20%,
        rgba(184, 46, 105, 0.38),
        transparent 40%
      ),
      radial-gradient(
        circle at 15% 85%,
        rgba(113, 35, 150, 0.30),
        transparent 50%
      )
    `,"03":`
      radial-gradient(
        circle at 25% 25%,
        rgba(41, 116, 180, 0.34),
        transparent 42%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(95, 42, 156, 0.34),
        transparent 48%
      )
    `}[e]}}),(0,s.jsxs)(`div`,{className:`\r
          relative\r
          z-10\r
\r
          mt-11\r
\r
          h-[220px]\r
          w-full\r
\r
          overflow-hidden\r
\r
          rounded-[1.4rem]\r
\r
          border\r
          border-white/10\r
        `,children:[(0,s.jsx)(`img`,{src:r,alt:n,className:`\r
            h-full\r
            w-full\r
\r
            object-cover\r
\r
            grayscale\r
\r
            brightness-[0.65]\r
            contrast-[1.08]\r
\r
            transition-all\r
            duration-1000\r
            ease-out\r
\r
            group-hover:scale-[1.06]\r
            group-hover:grayscale-0\r
            group-hover:brightness-100\r
          `}),(0,s.jsx)(`div`,{className:`\r
            pointer-events-none\r
            absolute\r
            inset-0\r
\r
            bg-gradient-to-t\r
            from-black/40\r
            via-transparent\r
            to-black/10\r
\r
            transition-opacity\r
            duration-700\r
\r
            group-hover:opacity-30\r
          `})]}),(0,s.jsxs)(`div`,{className:`\r
          absolute\r
          left-8\r
          right-8\r
          top-7\r
\r
          z-20\r
\r
          flex\r
          justify-between\r
        `,children:[(0,s.jsx)(`span`,{className:`\r
            font-mono\r
            text-xs\r
            text-white/30\r
\r
            transition-colors\r
            duration-500\r
\r
            group-hover:text-white/60\r
          `,children:e}),(0,s.jsx)(`span`,{className:`\r
            rounded-full\r
\r
            border\r
            border-white/15\r
\r
            bg-black/30\r
\r
            px-3\r
            py-1\r
\r
            font-mono\r
            text-[8px]\r
\r
            tracking-[0.15em]\r
\r
            text-white/45\r
\r
            backdrop-blur-md\r
\r
            transition-all\r
            duration-500\r
\r
            group-hover:border-white/30\r
            group-hover:bg-white/10\r
            group-hover:text-white/80\r
          `,children:t})]}),(0,s.jsxs)(`div`,{className:`\r
          relative\r
          z-10\r
\r
          px-2\r
          pt-7\r
          pb-3\r
\r
          transition-transform\r
          duration-700\r
\r
          group-hover:-translate-y-1\r
        `,children:[(0,s.jsx)(`h3`,{className:`\r
            text-2xl\r
            font-medium\r
\r
            tracking-[-0.04em]\r
\r
            transition-colors\r
            duration-500\r
\r
            group-hover:text-white\r
          `,children:n}),(0,s.jsx)(`p`,{className:`\r
            mt-4\r
\r
            leading-7\r
\r
            text-white/45\r
\r
            transition-colors\r
            duration-700\r
\r
            group-hover:text-white/70\r
          `,children:i})]}),(0,s.jsx)(`div`,{className:`\r
          pointer-events-none\r
\r
          absolute\r
          bottom-0\r
          left-0\r
\r
          h-px\r
          w-0\r
\r
          bg-gradient-to-r\r
          from-transparent\r
          via-white/60\r
          to-transparent\r
\r
          transition-all\r
          duration-1000\r
\r
          group-hover:w-full\r
        `})]})}function d({initials:e,name:t,role:n,children:r}){return(0,s.jsxs)(`article`,{className:`\r
        rounded-[2rem]\r
        border\r
        border-white/15\r
        bg-black/30\r
        p-8\r
        backdrop-blur-xl\r
        transition-all\r
        duration-500\r
        hover:-translate-y-2\r
        hover:border-white/30\r
      `,children:[(0,s.jsx)(`div`,{className:`text-lg tracking-[0.15em]`,children:`★★★★★`}),(0,s.jsx)(`p`,{className:`\r
          mt-7\r
          min-h-[150px]\r
          text-lg\r
          leading-8\r
          text-white/75\r
        `,children:r}),(0,s.jsxs)(`div`,{className:`\r
          mt-8\r
          flex\r
          items-center\r
          gap-4\r
          border-t\r
          border-white/10\r
          pt-6\r
        `,children:[(0,s.jsx)(`div`,{className:`\r
            flex\r
            h-12\r
            w-12\r
            items-center\r
            justify-center\r
            rounded-full\r
            bg-white/10\r
            font-medium\r
          `,children:e}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`p`,{className:`font-medium`,children:t}),(0,s.jsx)(`p`,{className:`\r
              mt-1\r
              font-mono\r
              text-[8px]\r
              uppercase\r
              tracking-[0.2em]\r
              text-white/35\r
            `,children:n})]})]})]})}export{l as default};