const LoadingSpinner = ({ label = "Loading content" }) => {
    return (
        <div className="loading">
            <span className="loading__ring" />
            <div className="flex min-h-40 items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-gold border-t-transparent" />
                <span>{label}</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;