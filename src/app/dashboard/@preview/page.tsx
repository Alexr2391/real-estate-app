import { ReactNode } from "react";



export default function DashboardPreview({ children }: { children: ReactNode }) {
    return (
        <section>
            <div></div>
            {children}
        </section>
    )
}