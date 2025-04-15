"use client"
import dynamic from "next/dynamic";
const RenderProfile = dynamic(() => import('@components/ssr/RenderProfile') as Promise<{ default: React.ComponentType }>, { ssr: false })

export default function Profile() {


    return (
        <div id="main_content">
            <div className="main_inner">
                <RenderProfile/>
            </div>
        </div>
    );
}
