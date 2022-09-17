const successResponse = (data) => ({
    success: true,
    data,
    timestamp: Date.now(),
});

const errorResponse = (e) => ({
    success: false,
    error: e?.message || e,
    timestamp: Date.now(),
});

module.exports = {
    successResponse,
    errorResponse,
}
