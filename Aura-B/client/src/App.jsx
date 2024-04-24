import { useLoader } from '@/hooks';
import { AppRoutes } from '@/routes';
import { 
   Breadcrubs, 
   Footer, 
   Navbar, 
   NotifyBar, 
   ShoppingCart, 
   Sidebar 
} from '@/interface';

import './assets/styles/config.css';
import './assets/styles/main.css';
import './assets/styles/loading.css';

export const App = () => {
   const { pathname } = useLoader();

   return (
      <>
         {
            pathname !== '/login' &&
               <header className="Header">
                  <NotifyBar />
                  <Navbar />
               </header>
         }
         <main className={`Main${ (pathname !== '/') ? ' Main--content' : ''}`}>
            <Breadcrubs path={ pathname } />
            <AppRoutes />
         </main>
         {
            pathname !== '/login' &&
               <>
                  <footer className="Footer">
                     <Footer />
                  </footer>
                  <Sidebar />
                  <ShoppingCart />
               </>
         }
      </>
   );
};