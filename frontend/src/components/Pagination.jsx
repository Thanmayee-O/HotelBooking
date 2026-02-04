import { useState } from "react";


function Pagination({currentPage , totalPages , onPageChange}){    
    const pages = Array.from({length : totalPages} , (_ , i) => i+1);
    
    return (
        <div className="flex items-center justify-center w-full max-w-80 text-gray-500 font-medium">
            <button type="button" className="rounded-full bg-slate-200/50 mr-3" disabled={currentPage === 1} onClick={()=>onPageChange(currentPage - 1)}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" strokeWidth=".078"/>
                </svg>
            </button>
        
            <div className="flex items-center gap-3 text-sm font-medium">                
                <span>{currentPage} out of {totalPages}</span>
            </div>
        
            <button type="button" className="rounded-full bg-slate-200/50 ml-3" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                <svg className="rotate-180" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" strokeWidth=".078"/>
                </svg>
            </button>
        </div>
    );
};

export default Pagination