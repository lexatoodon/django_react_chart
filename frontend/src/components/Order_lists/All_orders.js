import React from "react";
import "./Order_list.css"
import Plot from 'react-plotly.js';


class Orders extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            DataisLoaded: false,
            showDollarChart: false,
            showRubleChart:false,
        };
        this.onClickDollarChart = this.onClickDollarChart.bind(this);
        this.onClickRubleChart = this.onClickRubleChart.bind(this);
    }
    componentDidMount() {
        fetch(
          "http://localhost:8000/chart/api/")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    };
    onClickDollarChart(){
        this.setState({
            showDollarChart: true,
            showRubleChart:false,
        });
    };
    onClickRubleChart(){
        this.setState({
            showRubleChart: true,
            showDollarChart:false,
        });
    };

    showChart(x_dates, y_income, currency){
        let chart = (<div className="chart">
            <Plot
                data={[
                    {
                        x: x_dates,
                        y: y_income,
                        type: "bar",
                        mode: "lines",
                        marker:{color:"#1c7e94"},
                        name: ("Price " + currency),
                    },
                ]}
                layout={{
                autosize:  true,
                width: 1150,  
                height: 900,
                title:  currency,
                
                xaxis:{
                    autorange: true, 
                    nticks: 13,
                    title: "Date",
                },
                yaxis:{
                    autorange: true, 
                    title:('Price ' + currency),
                    type:"linear",

                }}}
            />
        </div>);
        return chart
    };

    render() {
        let chart = null
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;

        const prices_dollar = items.map(item => item.price_dollar)
        const prices_ruble = items.map(item => item.price_ruble)
        const delivery_times = items.map(item => item.delivery_time)

        if(this.state.showDollarChart){
            chart = this.showChart(delivery_times, prices_dollar, "USD")
        }
        if( this.state.showRubleChart){
            chart = this.showChart(delivery_times, prices_ruble, "RUBLE")
        }


        return (
        <div className = "List">
            <p>Total number of orders: <strong>{items.length}</strong></p>
            <p>Total income from finished and unfinished orders:
                <strong> {prices_dollar.reduce((total,current) => total = total + current, 0)}$ </strong>
                ({prices_ruble.reduce((total,current) => total = total + current, 0).toFixed(2)}₽)
            </p>
            <button className="btn" onClick={this.onClickDollarChart}>USD chart</button>
            <button className="btn" onClick={this.onClickRubleChart}>RUBLE chart</button>

            {chart}
            <h5>List of orders:</h5>
            {items.map((item) => (
                    <ul>Order №<strong>{item.order}</strong>. Price: {item.price_dollar}$, {item.price_ruble.toFixed(2)}₽. Ordered date: {item.created_date}. Delivery date: {item.delivery_time}. </ul>
                ))}
        </div>
    );
}
}
   
export default Orders;