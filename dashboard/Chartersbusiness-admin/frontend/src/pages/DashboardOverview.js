import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MAIN_APP_URL } from '../services/api';
import PageLayout from '../components/Layout/PageLayout';
import ApplicationList from '../components/Dashboard/ApplicationList';
import EnrollmentHero from '../components/Dashboard/EnrollmentHero';
import CareerRoadmap from '../components/Dashboard/CareerRoadmap';
import AdmissionPortal from '../components/Dashboard/AdmissionPortal';

const DashboardOverview = () => {
    const { user, generateRedirectCode, applications, refreshApplications } = useAuth();
    const [loadingApps, setLoadingApps] = useState(true);

    useEffect(() => {
        refreshApplications().finally(() => setLoadingApps(false));
    }, []);

    const handleApply = async () => {
        const code = await generateRedirectCode();
        if (code) {
            window.location.href = `${MAIN_APP_URL}/apply?code=${code}`;
        } else {
            alert("Failed to generate redirection. Please try again.");
        }
    };

    const latestApp = applications?.[0] || null;

    // hide portal if approved, pending, under_review, or rejected
    let hasSubmittedApplication = latestApp && latestApp.status !== 'draft';
    //hasSubmittedApplication = false;
    // don't render anything until we know the application state
    if (loadingApps) {
        return (
            <PageLayout title={null} subtitle={null} fullWidth={true}>
                <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)", fontSize: 14 }}>
                    Loading…
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout title={null} subtitle={null} fullWidth={true}>
            <div className="w-full flex flex-col bg-transparent">

                {!hasSubmittedApplication ? (
                    <div className="border-b border-border">
                        <AdmissionPortal existingApplication={latestApp} />
                    </div>
                ) : (
                    <>
                        <div className="border-b border-border">
                            <EnrollmentHero user={user} onApply={handleApply} />
                        </div>
                        <div className="border-b border-border">
                            <CareerRoadmap currentStep={2} />
                        </div>
                    </>
                )}

               {/* Only show application list if NOT approved/rejected */}
{(!latestApp || latestApp.status === 'draft' || latestApp.status === 'pending' || latestApp.status === 'under_review') && (
    <div>
        <ApplicationList />
    </div>
)}

            </div>
        </PageLayout>
    );
};

export default DashboardOverview;