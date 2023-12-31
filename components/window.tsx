'use client'
 
// Parent: app/page.tsx (index)
// Looks like a safari window for rendering featured projects

export default function Window(props : any){
    return(
        <div className="flex flex-col w-full gap-10">
            <div className="w-full h-[500px] bg-maint rounded-lg border border-white/20 shadow-xl transition overflow-hidden z-0">
                <div className="bg-soft100 py-2.5 px-4 flex justify-between items-center">
                    <div className="flex">
                        <div className="w-3 h-3 bg-red-300 rounded-full mr-1.5"></div>
                        <div className="w-3 h-3 bg-yellow-300 rounded-full mr-1.5"></div>
                        <div className="w-3 h-3 bg-green-300 rounded-full mr-1.5"></div>
                    </div>
                    <div className="bg-soft200 w-3/5 py-1 text-xs text-soft200 rounded-md text-center">
                        {props.url ? <a href={props.url}>{props.url}</a>: props.name}
                    </div>
                    <div className="w-12"></div>
                </div>
                <div className="flex flex-col h-5/6 p-4 items-center gap-4">
                    {props.img == null ? null :
                        <div className="w-full h-4/5 bg-soft100 overflow-hidden rounded-md py-8">
                            <img className='object-cover h-full m-auto' alt={props.name} src={props.img}></img>
                        </div>
                    }
                    <div className='flex w-3/5 gap-2 justify-between items-center py-2'>
                        <div>
                            <h2 className="text my-2 font-semibold">{props.name}</h2>
                            <p className="text-sm text-gray-500">{props.desc}</p>
                        </div>
                        <a className="text-sm text-white bg-blue-500 py-1 px-4 rounded-full w-fit" href={props.href}>Read More</a>
                    </div>
                </div>
            </div>
        </div>
    )
}