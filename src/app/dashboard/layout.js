
import Sidebar from "./sidebar";
import ProtectedRoute from "../components/protectedRoute";

export default function Layout({ children }) {
    return (



        <ProtectedRoute role="member">
            <Sidebar >
          
            {children}
            </Sidebar>
        </ProtectedRoute>
    );
}
