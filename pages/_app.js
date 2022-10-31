import Layout from '../components/layout/layout.component';
import '../styles/globals.scss';
import { AnimatePresence,motion } from "framer-motion"
import { useRouter } from 'next/router';

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 200, y: 0 },
};

function MyApp({ Component, pageProps }) {
  const router =useRouter();
  return(
    <Layout>
      <AnimatePresence mode='wait' initial={true} onExitComplete={()=> window.scrollTo(0,0)}>
        <motion.main key={router.pathname==="/"?"home":router.pathname} variants={variants} initial="hidden" animate="enter" transition={{type:"linear"}}>
          <Component {...pageProps} />
        </motion.main>
      </AnimatePresence>
    </Layout>
  );
  
}

export default MyApp
