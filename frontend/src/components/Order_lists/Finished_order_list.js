import React from "react";
import "./Order_list.css"
import Orders from "./All_orders";

class FinishedOrders extends Orders{
    constructor(props){
        super();
    }
    componentDidMount() {
        fetch(
          "http://localhost:8000/chart/api/finished/")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    };
    render(){
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
            <p>Total number of finished orders: <strong>{items.length}</strong></p>
            <p>Income from finished orders:
                <strong> {prices_dollar.reduce((total,current) => total = total + current, 0)}$ </strong>
                ({prices_ruble.reduce((total,current) => total = total + current, 0).toFixed(2)}₽)
            </p>
            <button className="btn" onClick={this.onClickDollarChart}>USD chart</button>
            <button className="btn" onClick={this.onClickRubleChart}>RUBLE chart</button>
            {chart}
            <h5>List of finished orders:</h5>
            {items.map((item) => (
                    <ul>Order №<strong>{item.order}</strong>. Price: {item.price_dollar}$, {item.price_ruble.toFixed(2)}₽. Ordered date: {item.created_date}. Delivery date: {item.delivery_time}. </ul>
                ))}
        </div>
        )   
    }
}


export default FinishedOrders;