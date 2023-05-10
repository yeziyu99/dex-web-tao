// Datafeed implementation that you will add later
import Datafeed from './datafeed.js';

window.onload = () => {
    window.tvWidget = new TradingView.widget({
        symbol: 'Bitfinex:BTC/USD',            // Default symbol pair
        interval: '1D',                        // Default interval
        fullscreen: false,                      // Displays the chart in the fullscreen mode
        autosize: true,
        container: 'tv_chart_container',       // Reference to an attribute of a DOM element
        datafeed: Datafeed,
        library_path: '../charting_library/charting_library/',
    });
}
