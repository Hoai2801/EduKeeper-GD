import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useHandleDetailDocs = () => {
    const navigate = useNavigate();
    const handleDetailDocs = (slug) => {
        navigate(`/document/${slug}`);
    };
    return handleDetailDocs;
};

export { useHandleDetailDocs };