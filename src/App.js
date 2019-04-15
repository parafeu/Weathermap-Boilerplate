import React, { Component } from 'react';
import { Menu, Layout, Select, Input } from 'antd';
import axios from 'axios';
import './App.css';
import 'antd/dist/antd.css';
import config from './config.js';
import WeatherMap from './WeatherMap';

const MenuItem = Menu.Item;
const Header = Layout.Header;
const Sider = Layout.Sider;
const Content = Layout.Content; 

class App extends Component {

  state = {
    value: null,
    selected: "",
    cities: {}
  }

  getQueryKeys = () => {
    let returnKeys = [];
    Object.keys(this.state.cities).forEach((query) => returnKeys.push(<MenuItem key={query}>{query}</MenuItem>))
    return returnKeys;
  }  
  
  fetchWeather = (q) => {
    axios.get(config.weatherApiLink, {
      params: {
        q,
        appid: config.weatherApiKey,
        lang: "fr"
      }
    }).then(({ data }) => {
      let cities = {...this.state.cities};
      cities[q] = data
      this.setState({ cities, value: null, selected: q });
    })
  }

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Input.Search value={this.state.value} placeholder="Rechercher une ville" onSearch={this.fetchWeather} onChange={(e) => this.setState({ value: e.target.value }) }/>
        </Header>
        <Layout>
          <Sider >
            <Menu theme="dark" onSelect={(params) => this.setState({ selected: params.key })} selectedKeys={[this.state.selected]}>
              {
                this.getQueryKeys()
              }
            </Menu>
          </Sider>
          <Content>
            {
              this.state.selected !== "" && <WeatherMap data={this.state.cities[this.state.selected]}/>
            }
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
