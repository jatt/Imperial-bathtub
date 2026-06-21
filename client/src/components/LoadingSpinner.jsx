const LoadingSpinner = ({ label = "Loading content" }) => {
    return (
        <div className="loading">
            <span className="loading__ring" />
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">
                {label}
            </span>
        </div>
    );
};

export default LoadingSpinner;