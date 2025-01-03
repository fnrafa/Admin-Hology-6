"use client";
import React, {useEffect, useState} from "react";
import basepath from "@/components/utils/path";
import apiurl from "@/components/utils/api";
import DashboardRecent from "@/components/handler/page/dashboard/dashboardRecent";

export default function DashboardData() {
    const [data, setData] = useState({
        user: 0,
        increase: 0,
        activity: 0,
        seminar: 0,
        totalUiUx: 0,
        totalItBusinessCase: 0,
        totalCaptureTheFlag: 0
    });
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiurl}/dashboard`);
            const responseData = await response.json();
            const updatedData = {...data, ...responseData};
            setData(updatedData);
            if (response.ok){
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data from API:', error.message);
        }
    };
    useEffect(() => {
        fetchData().then();
    }, []);

    if (loading) {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Waiting API to respond...</h5>
                    <p>Please refresh the page if the loading continues, or contact the PIT team if the issue
                        persists.</p>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }
    const percentage = data.user !== 0 ? ((data.increase / data.user) * 100).toFixed(1) : 0;
    const seminarPercentage = data.user !== 0 ? ((data.seminar / data.user) * 100).toFixed(1) : 0;

    return (
        <div className="row">
            <div className="col-xxl-4 col-xl-8">
                <div className="card info-card customers-card">
                    <div className="card-body">
                        <h5 className="card-title">Total Account
                            Users <span>| {data.activity} Activity</span></h5>
                        <div className="d-flex align-items-center">
                            <div
                                className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-people"></i>
                            </div>
                            <div className="ps-3">
                                <h6>{data.user}</h6>
                                {data.increase === 0 ? (
                                    <span className="text-muted small pt-2 ps-1">Unchanged</span>
                                ) : (
                                    <>
                                        <span className="text-success small pt-1 fw-bold">{percentage}%</span>
                                        <span className="text-muted small pt-2 ps-1">increase today</span>
                                        <span className="text-success small pt-1 fw-bold"> +{data.increase}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xxl-4 col-md-4">
                <div className="card info-card sales-card">
                    <a href={`${basepath}/competition/uiux`}>
                        <div className="card-body">
                            <h5 className="card-title">Seminar Participant <span>| {seminarPercentage}%</span></h5>
                            <div className="d-flex align-items-center">
                                <div
                                    className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <i className="bi bi-megaphone"></i>
                                </div>
                                <div className="ps-3">
                                    <h6>{data.seminar}</h6>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="col-12">
                <div className="card recent-sales overflow-auto">
                    <DashboardRecent></DashboardRecent>
                </div>
            </div>
            <div className="col-xxl-4 col-md-4">
                <div className="card info-card sales-card">
                    <a href={`${basepath}/competition/ctf`}>
                        <div className="card-body">
                            <h5 className="card-title">Capture the Flag</h5>
                            <div className="d-flex align-items-center">
                                <div
                                    className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <i className="bi bi-flag"></i>
                                </div>
                                <div className="ps-3">
                                    <h6 className={data.totalCaptureTheFlag === 0 ? "text-danger" : ""}>
                                        {data.totalCaptureTheFlag} Teams
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="col-xxl-4 col-md-4">
                <div className="card info-card sales-card">
                    <a href={`${basepath}/competition/itbc`}>
                        <div className="card-body">
                            <h5 className="card-title">IT Business Case</h5>
                            <div className="d-flex align-items-center">
                                <div
                                    className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <i className="bi bi-briefcase"></i>
                                </div>
                                <div className="ps-3">
                                    <h6 className={data.totalItBusinessCase === 0 ? "text-danger" : ""}>
                                        {data.totalItBusinessCase} Teams
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="col-xxl-4 col-md-4">
                <div className="card info-card sales-card">
                    <a href={`${basepath}/competition/uiux`}>
                        <div className="card-body">
                            <h5 className="card-title">UI/UX Design</h5>
                            <div className="d-flex align-items-center">
                                <div
                                    className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <i className="bi bi-code-slash"></i>
                                </div>
                                <div className="ps-3">
                                    <h6 className={data.totalUiUx === 0 ? "text-danger" : ""}>
                                        {data.totalUiUx} Teams
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}