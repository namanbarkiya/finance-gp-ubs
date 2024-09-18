import { useState } from "react";
import Button from "./Button";

export default function Modal(props: {
    children: any;
    buttonText: string;
    header: string;
}) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setModalOpen(!modalOpen)}
                buttonText={props.buttonText}
            />
            {modalOpen ? (
                <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow  min-h-60">
                            <div className="">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {props.header}
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                        onClick={() => setModalOpen(false)}
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">
                                            Close modal
                                        </span>
                                    </button>
                                </div>
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
