import React, { useState, useEffect } from "react";
import { PiCurrencyDollarBold, PiCurrencyEurBold } from "react-icons/pi";
import {formatNumber} from "../../utill/FormatNumber";

function ExchangeRate() {
    const [rates, setRates] = useState(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
                const data = await response.json();

                const responseCad = await fetch("https://api.exchangerate-api.com/v4/latest/CAD");
                const dataCad = await responseCad.json();

                const responseEur = await fetch("https://api.exchangerate-api.com/v4/latest/EUR");
                const dataEur = await responseEur.json();

                const responseMxn = await fetch("https://api.exchangerate-api.com/v4/latest/MXN");
                const dataMxn = await responseMxn.json();

                setRates({
                    USDKRW: data.rates.KRW,
                    CADKRW: dataCad.rates.KRW,
                    EURKRW: dataEur.rates.KRW,
                    MXNKRW: dataMxn.rates.KRW,
                });
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
            }
        };

        fetchRates();
    }, []);

    return (
        <>
            <div className="exchange_rate card">
                <div className="usd_rate_box">
                    <div className="usd_icon_box">
                        <PiCurrencyDollarBold className="usd_rate_icon"/>
                    </div>
                    <div className="usd_rate_text">{rates ? formatNumber(rates.USDKRW.toFixed(2)) : "Loading..."}</div>
                    <div className="usd_rate_title_text">USD/KRW</div>
                </div>
                <div className="cad_rate_box">
                    <div className="cad_icon_box">
                        <PiCurrencyDollarBold className="cad_rate_icon"/>
                    </div>
                    <div className="cad_rate_text">{rates ? formatNumber(rates.CADKRW.toFixed(2)) : "Loading..."}</div>
                    <div className="cad_rate_title_text">CAD/KRW</div>
                </div>
                <div className="eur_rate_box">
                    <div className="eur_icon_box">
                        <PiCurrencyEurBold className="eur_rate_icon"/>
                    </div>
                    <div className="eur_rate_text">{rates ? formatNumber(rates.EURKRW.toFixed(2)) : "Loading..."}</div>
                    <div className="eur_rate_title_text">EUR/KRW</div>
                </div>
                <div className="mxn_rate_box">
                    <div className="mxn_icon_box">
                        <PiCurrencyDollarBold className="mxn_rate_icon"/>
                    </div>
                    <div className="mxn_rate_text">{rates ? formatNumber(rates.MXNKRW.toFixed(2)) : "Loading..."}</div>
                    <div className="mxn_rate_title_text">MXN/KRW</div>
                </div>
            </div>
        </>
    );
}

export default ExchangeRate;