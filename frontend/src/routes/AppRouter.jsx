import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Books from '../pages/Books';
import MyBooks from '../pages/MyBooks';
import AddBooks from '../components/book/AddBooks';
import ViewBooks from '../components/book/ViewBooks';
import EditBooks from '../components/book/EditBooks';
import AdminDashboard from '../pages/AdminDashboard';
import Layout from '../components/Layout/Layout';
import ProtectedRoute from '../components/Layout/ProtectedRoute';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import UserManagement from '../pages/UserManagement';
import Settings from '../pages/Settings';
import Payment from '../pages/Payment';
import BooksViewPage from '../pages/BooksViewPage';
import PaymentPage from '../pages/PaymentPage';
import MyBooksPage from '../pages/MyBooksPage';




const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute path='/'> <Home /> </ProtectedRoute>} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/signup" element={<ProtectedRoute path='/signup'> <Signup /> </ProtectedRoute>} />
            <Route path="/login" element={<ProtectedRoute path='/login'> <Login /> </ProtectedRoute>} />
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/about" element={<ProtectedRoute path='/about'> <About /> </ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute path='/contact'> <Contact /> </ProtectedRoute>} />
            {/* <Route path="/contact" element={<Contact />} /> */}

            {/* User Dashboard Route*/}
            <Route path="/dashboard" element={
                <ProtectedRoute path="/dashboard">
                    <Layout>
                        <Dashboard />
                    </Layout>
                </ProtectedRoute>} >
            </Route>

            {/* Admin Dashboard Route*/}
            <Route path="/admin" element={
                <ProtectedRoute path="/admin" >
                    <Layout>
                        <AdminDashboard />
                    </Layout>
                </ProtectedRoute>} >
            </Route>

            {/* <Route path="/admin" element={<About />} /> */}
            {/* <Route path="/contact" element={<Contact />} />   */}
            {/* <Route path="/contact" element={<Proctated yes={() => <Contact />} no={() => <Login />} isAllow="/contact" />} />  <ProctatedPage yes={() => <Contact />} no={() => <Login />} /> */}


            {/* Account Route */}
            <Route path="/account" element={
                <ProtectedRoute path="/account">
                    <Layout>
                        <Settings />
                    </Layout>
                </ProtectedRoute>} >
            </Route>

            {/* Book Route */}
            <Route path="/books" element={
                <ProtectedRoute path="/books">
                    <Layout>
                        <Books />
                    </Layout>
                </ProtectedRoute>} >
            </Route>

            {/* Book Route */}
            <Route path="/books/add" element={
                <ProtectedRoute path="/books/add">
                    <Layout>
                        <AddBooks />
                    </Layout>
                </ProtectedRoute>} >
            </Route>

            <Route path="/books/payment/:id" element={
                <ProtectedRoute path="/books/payment/:id">
                    <Layout>
                        <PaymentPage />
                    </Layout>
                </ProtectedRoute>} >
            </Route>

            {/* MyBook Route*/}
            <Route path="/myBooks" element={
                <ProtectedRoute path="/myBooks">
                    <Layout>
                        <MyBooks />
                    </Layout>
                </ProtectedRoute>} >
            </Route>

            {/* UserManagement Route*/}

            <Route path="/userManagement" element={
                <ProtectedRoute path="/userManagement">
                    <Layout>
                        <UserManagement />
                    </Layout>
                </ProtectedRoute>} >
            </Route>

            {/* Setting  Route */}
            <Route path="/settings" element={
                <ProtectedRoute path="/settings">
                    <Layout>
                        <Settings />
                    </Layout>
                </ProtectedRoute>} >
            </Route>

            <Route path="/books/view/:id" element={
                <ProtectedRoute path="/books/view/:id">
                    <Layout>
                        <BooksViewPage />
                    </Layout>
                </ProtectedRoute>} >
            </Route>

            <Route path="/books/payment/:id" element={
                <ProtectedRoute path="/books/payment/:id">
                    <Layout>
                        <PaymentPage />
                    </Layout>
                </ProtectedRoute>} >
            </Route>

            <Route path="/my-books" element={
                <ProtectedRoute path="/my-books">
                    <Layout>
                        <MyBooksPage />
                    </Layout>
                </ProtectedRoute>} >
            </Route>

            <Route path="/books/addbooks" element={<AddBooks />} />
            <Route path="/books/viewbooks" element={<ViewBooks />} />
            <Route path="/books/editbooks" element={<EditBooks />} />
            {/* myBook Route */}
            {/* <Route path="/myBooks" element={<MyBooks />} /> */}

            <Route path="/unauthorized" element={<UnauthorizedPage />} />

        </Routes >
    )
}

export default AppRouter;
