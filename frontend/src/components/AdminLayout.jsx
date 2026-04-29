import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-slate-100 font-neue">
            <Sidebar />
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;