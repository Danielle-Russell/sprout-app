import React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ActivityLog from '../activity-log/activity-log'

import SproutContext from "../SproutContext";

export default class Dashboard extends React.Component {

  
  static contextType = SproutContext;

  back = () => {
    this.props.history.goBack();
  };

  
  render() {
    //push each category into arrays
    let sprouts = [];
    const sproutArray = () => {
      for (var key in this.context.sprouts) {
        if (key.length) {
          sprouts.push(this.context.sprouts[key]);
        }
      }
    };
    let activities = [];
    const activityArray = () => {
      for (var key in this.context.activities) {
        activities.push(this.context.activities[key]);
      }
    };
    let health = [];
    const healthArray = () => {
      for (var key in this.context.health) {
        health.push(this.context.health[key]);
      }
    };
    let growth = [];
    const growthArray = () => {
      for (var key in this.context.growth) {
        growth.push(this.context.growth[key]);
      }
    };
    let milestones = [];
    const milestoneArray = () => {
      for (var key in this.context.milestones) {
        milestones.push(this.context.milestones[key]);
      }
    };
    sproutArray();
    activityArray();
    healthArray();
    growthArray();
    milestoneArray();

    const sortedGrowth = growth
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reverse();

    const { id } = this.props.match.params;

    const findFinalId = () => {
      
      for (let i = 0; i < sprouts.length; i++) {
        if (Number(id) === sprouts[i].id) {
          var years = moment().diff(sprouts[i].age, 'year');
var months = moment().diff(sprouts[i].age, 'months');
var age = years < 1 ? months : years 
var yd = years < 1 ? 'months' : 'years'
          return (
            <div className="profile">
              <img
                className="profile-pic"
                src={sprouts[i].image}
                alt="profile"
              />
             
                <p>{sprouts[i].name}</p> <p>{age} {yd}</p>

            </div>
          );
        }
      }
    };
    const dashboardArray = activities.concat(health, growth, milestones);
    const dashArray = dashboardArray.filter((element) => element !== "");
    const finalDashArray = dashArray.sort(
      (a, b) => new Date(a.date + a.time) - new Date(b.date + b.time)
    );

    //charts
    let heightChart = [];
    let heightData = [];
    let weightChart = [];
    let weightData = [];

    const sortGrowth = sortedGrowth.map((grow, index) => {
      if (grow.title === "Height" && grow.sproutid === Number(id)) {
        heightChart.push(grow.date);
        heightData.push(grow.number);
      }
      if (grow.title === "Weight" && grow.sproutid === Number(id)) {
        weightChart.push(grow.date);
        weightData.push(grow.number);
      }
      return null;
    });
    let x = [];

    weightChart.reverse().forEach((z) => {
      let date = z;
      x.push(date);
    });
    let y = [];
    weightData.reverse().forEach((z) => {
      let data = z;
      y.push(data);
    });

    let a = [];
    heightChart.reverse().forEach((z) => {
      let date = z;
      a.push(date);
    });
    let b = [];
    heightData.reverse().forEach((z) => {
      let data = z;
      b.push(data);
    });
    const array = finalDashArray.filter((act) => Number(id) === act.sproutid);
    const pie = activities.filter((act) => Number(id) === act.sproutid);
    const feed = pie.filter((act) => act.title === "Feed");
    const diaper = pie.filter((act) => act.title === "Diaper");

    const sleep = pie.filter((act) => act.title === "Sleep");
const recent = array.sort((a, b) => new Date(a.date) - new Date(b.date))
.reverse();

    //group by date
    function datesGroupByComponent(dates, token) {
      return dates.reduce(function (val, obj) {
        let comp = moment(obj["date"], "YYYY-MM-DD").format(token);
        (val[comp] = val[comp] || []).push(obj);
        return val;
      }, {});
    }
    //aveage weekly values
    var xy;
    var count = 0;
    var averageWeeklyFeed = 0;
    for (xy in datesGroupByComponent(feed, "w")) {
      count += datesGroupByComponent(feed, "w")[xy].length;
      var denom = Object.keys(datesGroupByComponent(feed, "w"));
      averageWeeklyFeed = count / denom.length;
    }

    var key2;
    var count2 = 0;
    var averageWeeklyDiaper = 0;
    for (key2 in datesGroupByComponent(diaper, "w")) {
      count2 += datesGroupByComponent(diaper, "w")[key2].length;
      var denom = Object.keys(datesGroupByComponent(diaper, "w"));
      averageWeeklyDiaper = count2 / denom.length;
    }

    var count3 = 0;
    var key3;
    var averageWeeklySleep = 0;
    for (key3 in datesGroupByComponent(sleep, "D")) {
      count3 += datesGroupByComponent(sleep, "D")[key3].length;
      var denom = Object.keys(datesGroupByComponent(sleep, "D"));
      averageWeeklySleep = count3 / denom.length;
    }

    //average daily values
    var count4 = 0;
    var key4;
    var averageDailySleep = 0;
    for (key4 in datesGroupByComponent(sleep, "D")) {
      count4 += datesGroupByComponent(sleep, "D")[key4].length;
      var denom = Object.keys(datesGroupByComponent(sleep, "D"));
      averageDailySleep = count4 / denom.length;
    }

    var count5 = 0;
    var key5;
    var averageDailyDiaper = 0;
    for (key5 in datesGroupByComponent(diaper, "D")) {
      count5 += datesGroupByComponent(diaper, "D")[key5].length;
      var denom = Object.keys(datesGroupByComponent(diaper, "D"));
      averageDailyDiaper = count5 / denom.length;
    }
    var count6 = 0;
    var key6;
    var averageDailyFeed = 0;
    for (key6 in datesGroupByComponent(feed, "D")) {
      count6 += datesGroupByComponent(feed, "D")[key6].length;
      var denom = Object.keys(datesGroupByComponent(feed, "D"));
      averageDailyFeed = count6 / denom.length;
    }

    //monthly averages
    var count7 = 0;
    var key7;
    var averageMonthlyFeed = 0;
    for (key7 in datesGroupByComponent(feed, "M")) {
      count7 += datesGroupByComponent(feed, "M")[key7].length;
      var denom = Object.keys(datesGroupByComponent(feed, "M"));
      averageMonthlyFeed = count7 / denom.length;
    }

    var count8 = 0;
    var key8;
    var averageMonthlyDiaper = 0;
    for (key8 in datesGroupByComponent(diaper, "M")) {
      count8 += datesGroupByComponent(diaper, "M")[key8].length;
      var denom = Object.keys(datesGroupByComponent(diaper, "M"));
      averageMonthlyDiaper = count8 / denom.length;
    }
    var count9 = 0;
    var key9;
    var averageMonthlySleep = 0;
    for (key9 in datesGroupByComponent(sleep, "M")) {
      count9 += datesGroupByComponent(sleep, "M")[key9].length;
      var denom = Object.keys(datesGroupByComponent(sleep, "M"));
      averageMonthlySleep = count9 / denom.length;
    }
    console.log(averageMonthlyFeed)
    const chart = () => {
     
      if (averageMonthlyFeed >= 1) {
        return         <> <div className="wrapper">

          <div className="item">
          Growth Patterns
            <Line
              data={{
                plugins: [ChartDataLabels],
                labels: x,
                datasets: [
                  {
                    label: "Weight",
                    data: y,
                    fill: false,
                    borderColor: "#742774",
                  },
                ],
              }}
            />
                  </div>
                  <div className="item"   >

           
            <Line
              data={{
                plugins: [ChartDataLabels],
                labels: a,
                datasets: [
                  {
                    label: "Height",
                    data: b,
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                  },
                ],
              }}
            />
          </div>
          </div>
          <div className="wrapper">
    
        <div className="act-chart">
        <Doughnut
          data={{
            plugins: [ChartDataLabels],
            labels: ["Sleep", "Feed", "Diaper"],
            datasets: [
              {
                labels: ["Sleep", "Feed", "Diaper"],
                data: [
                  averageDailySleep,
                  averageDailyFeed,
                  averageDailyDiaper,
                ],
                fill: true,
                backgroundColor: ["#587792", "#8DB1AB", "#CEE397"],
                borderColor: "rgba(75,192,192,1)",
              },
            ],
          }}
          options = {{
            title: {
              text: "Average Distribution of Daily Activities",
            display: true,
            position: "top"
          }}}
        />
        <table>
          <tr>
            <td>&nbsp;</td>
            <td>Feeds</td>
            <td>Diapers</td>
            <td>Sleep</td>
          </tr>
          <tr>
            <td>Daily</td>
            <td>{averageDailyFeed}</td>
            <td>{averageDailyDiaper}</td>
            <td>{averageDailySleep}</td>
          </tr>
          <tr>
            <td>Weekly</td>
            <td>{averageWeeklyFeed}</td>
            <td>{averageWeeklyDiaper}</td>
            <td>{averageWeeklySleep}</td>
          </tr>
          <tr>
            <td>Monthly</td>
            <td>{averageMonthlyFeed}</td>
            <td>{averageMonthlyDiaper}</td>
            <td>{averageMonthlySleep}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{feed.length}</td>
            <td>{diaper.length}</td>
            <td>{sleep.length}</td>
          </tr>
        </table>
          </div>
           <div>

           <ul className="recent-feed">
          <h1>Recent Feed</h1>

{recent.slice(0,3).map((act) => {
var now = moment().format("YYYY-MM-DD");
var color;
var src;
  var time = act.time;
  var date = act.date;
  if (now <= date) {
    var timeFormatted = moment(time, "HH:mm").fromNow();
    var date = timeFormatted;
  } else {
    var timeFormatted = time;
  } if (act.title === "Feed") {
color = "feed"
src="https://static.thenounproject.com/png/749416-200.png"

  } if (act.title === "Diaper") {
    color = "diaper"
    src="https://static.thenounproject.com/png/3380453-200.png"
  } if (act.title === "Sleep" ) {
    color = "sleep"
    src= "https://img.icons8.com/carbon-copy/452/partly-cloudy-night.png"
  }


  return (
    <>
      <span className="dash-span">
        {date} 
      </span>
      <li className={color}><strong>{act.title}</strong> <br /> {act.notes}  <img className="recent-feed-img
      " src={src} /></li>
    </>
  );

})}
</ul>
</div>
</div>
</>

      } return null
    }
    return (
      <>
        <header>{findFinalId()} </header>
        <div className="sidebar">
        <button className="home-btn" onClick={this.back}>
            <FontAwesomeIcon icon={faLongArrowAltLeft}/> Back To Sprouts
          </button>
          </div>
        <h2 className="center">Dashboard</h2>
        {feed.length >= 1 ? null : <h1 className="center">Get started by clicking one of the boxes above to add activities or records.</h1>}

        <div className="wrapper">

          <ul className="box
          ">
            {sprouts.map((sprout, index) => {
              if (Number(id) === sprout.id) {
                return (
                  <Link className="link" to={`/growth/${sprout.id}`}>
                    <h1>Growth</h1>
                    <img
                      className="grow"
                      src="https://freeiconshop.com/wp-content/uploads/edd/upward-trend-flat-128x128.png"
                    />
                  </Link>
                );
              }
              return null
            })}
           
        
          </ul>

<ul className="box">
            {sprouts.map((sprout, index) => {
              if (Number(id) === sprout.id) {
                return (
                  <Link className="link" to={`/activity-log/${sprout.id}`}>
                    <h1>Activity Log </h1>
                    <img
                      className="grow"
                      src="https://freeiconshop.com/wp-content/uploads/edd/orange-flat-128x128.png"
                    />
                  </Link>
                );
              }

              return null;
            })}
          </ul>

          <ul className="box">
            {sprouts.map((sprout, index) => {
              if (Number(id) === sprout.id) {
                return (
                  <Link className="link" to={`/milestones/${sprout.id}`}>
                    <h1>Milestones</h1>
                  </Link>
                );
              }
              return null;
            })}
            <img
              className="grow"
              alt="sprout"
              src="https://freeiconshop.com/wp-content/uploads/edd/badge-flat.png"
            />
          </ul>

          <ul className = "box">
            {sprouts.map((sprout, index) => {
              if (Number(id) === sprout.id) {
                return (
                  <Link className="link" to={`/health/${sprout.id}`}>
                    <h1>Health Records</h1>
                    <img
                      className="grow"
                      src="https://freeiconshop.com/wp-content/uploads/edd/clipboard-list-flat.png"
                    />
                  </Link>
                );
              }
              return null;
            })}
          </ul>
        </div>

      {chart()}
             
</>

    );
  }
}
