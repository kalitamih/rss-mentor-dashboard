import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Search from './Search';
import './button.css';

const _ = require('lodash');

const color = {
  'in progress': 'yellow',
  checking: 'red',
  checked: 'DarkRed',
  todo: 'grey',
};

class Drawing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      githubLogin: '',
    };
    const TYPE_RELOAD = 1;
    if (window.performance) {
      if (performance.navigation.type === TYPE_RELOAD) {
        localStorage.removeItem('login');
      }
    }
  }

  componentDidMount() {
    this.getGithubName();
  }

  getGithubName = () => {
    const { login } = this.props;
    fetch(`https://api.github.com/user/${login}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          githubLogin: data.login.toLowerCase(),
        });
        this.getDataFromServer();
        return data.login;
      })
      .then(data => localStorage.setItem('mentor', data.toLowerCase()));
  }

  getDataFromServer = () => {
    const { githubLogin } = this.state;
    const mentor = localStorage.getItem('login') ? localStorage.getItem('mentor') : githubLogin;
    fetch('https://kalitamih.github.io/rss-mentor-dashboard/result.json')
      .then(response => response.json())
      .then(data => data[mentor])
      .then(data => _.map(data, (item, key) => {
        const styleCV = (parseInt(item.cv, 10) || parseInt(item.cv, 10) === 0) ? 'green' : color[item.cv];
        const styleCoreJS = (parseInt(item.corejs, 10) || parseInt(item.corejs, 10) === 0) ? 'green' : color[item.corejs];
        const styleMarkup = (parseInt(item.markup, 10) || parseInt(item.markup, 10) === 0) ? 'green' : color[item.markup];
        const styleActivist = (parseInt(item.activist, 10) || parseInt(item.activist, 10) === 0) ? 'green' : color[item.activist];
        const styleYoutube = (parseInt(item.youtube, 10) || parseInt(item.youtube, 10) === 0) ? 'green' : color[item.youtube];
        const styleScoreboard = (parseInt(item.scoreboard, 10) || parseInt(item.scoreboard, 10) === 0) ? 'green' : color[item.scoreboard];
        const styleGame = (parseInt(item.game, 10) || parseInt(item.game, 10) === 0) ? 'green' : color[item.game];
        const styleCourseWork = (parseInt(item['course work'], 10) || parseInt(item['course work'], 10) === 0) ? 'green' : color[item['course work']];
        const stylePresentation = (parseInt(item.presentation, 10) || parseInt(item.presentation, 10) === 0) ? 'green' : color[item.presentation];

        return (
          <tr key={key}>
            <td>{key}</td>
            <td style={{ background: styleCV }}>{item.cv}</td>
            <td style={{ background: styleCoreJS }}>{item.corejs}</td>
            <td style={{ background: styleMarkup }}>{item.markup}</td>
            <td style={{ background: styleActivist }}>{item.activist}</td>
            <td style={{ background: styleYoutube }}>{item.youtube}</td>
            <td style={{ background: styleScoreboard }}>{item.scoreboard}</td>
            <td style={{ background: styleGame }}>{item.game}</td>
            <td style={{ background: styleCourseWork }}>{item['course work']}</td>
            <td style={{ background: stylePresentation }}>{item.presentation}</td>
          </tr>
        );
      }))
      .then(data => this.setState({
        options: data,
      }))
      .then(localStorage.setItem('login', 'success'));
  }

  handleChange = (newMentor) => {
    localStorage.setItem('mentor', newMentor.selectedOption.value);
    this.getDataFromServer();
  }

  render() {
    const { options } = this.state;
    const { githubLogin } = this.state;
    return (
      <div>
        { githubLogin && localStorage.getItem('login') ? (
          <div>
            <Search onUpdate={this.handleChange} login={githubLogin} />
            <Table>
              <thead>
                <tr>
                  <th />
                  <th>CV</th>
                  <th>CoreJS</th>
                  <th>Markup</th>
                  <th>Activist</th>
                  <th>Youtube</th>
                  <th>Scoreboard</th>
                  <th>Game</th>
                  <th>Course work</th>
                  <th>Presentation</th>
                </tr>
              </thead>
              <tbody>
                {options}
              </tbody>
            </Table>
          </div>) : (<p className="loading">Loading</p>)
       }
      </div>
    );
  }
}

Drawing.propTypes = {
  login: PropTypes.string.isRequired,
};

export default Drawing;
