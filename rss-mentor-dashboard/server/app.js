const express = require('express');

const app = express();

const xlsxj = require('xlsx-to-json-lc');

const _ = require('lodash');

const fs = require('fs');

const cors = require('cors');

function pairsMentorStudents() {
  return new Promise((resolve, reject) => {
    xlsxj({
      input: './uploads/Mentor-students pairs.xlsx',
      output: './uploads/Pairs.json',
      sheet: 'pairs',
      lowerCaseHeaders: true,
    }, (err, result) => {
      if (err) {
        console.error(err);
        reject();
      } else {
        const pairsObject = result.map((item) => {
          const object = Object.assign({
            mentor: item.interviewer
              .toLowerCase()
              .trim(),
            studentGithub: item['student github']
              .toLowerCase()
              .trim(),
          });
          return object;
        });

        pairsObject.sort((a, b) => {
          if (a.mentor > b.mentor) return -1;
          if (b.mentor > a.mentor) return 1;
          return 0;
        });

        const GroupByMentor = Object.values(_
          .chain(pairsObject)
          .groupBy('mentor')
          .mapValues(
            object => object.map(item => _.omit(item, 'mentor')),
          )
          .map((item, key) => [key, _.map(item, value => value.studentGithub)])
          .dropRight()
          .fromPairs()
          .value());
        if (GroupByMentor) resolve(GroupByMentor);
      }
    });
  });
}

function tasks(GroupByMentor) {
  return new Promise((resolve, reject) => {
    xlsxj({
      input: './uploads/Tasks.xlsx',
      output: './uploads/Tasks.json',
      lowerCaseHeaders: true,
    }, (err, result) => {
      if (err) {
        console.error(err);
        reject();
      } else {
        const tasksObject = result.map((item) => {
          const object = Object.assign({
            task: item.task
              .toLowerCase()
              .replace('code jam ', '')
              .replace('codejam ', '')
              .replace(', dom events', '')
              .replace('"', '')
              .replace('"', '')
              .replace(' #1', '')
              .replace('rs activist -', 'activist')
              .trim(),
            status: item.status
              .toLowerCase()
              .trim(),
          });
          return object;
        });

        const taskObjectCompleted = _
          .chain(tasksObject)
          .map(item => [item.task, item.status])
          .concat([
            ['presentation', 'checked'],
          ])
          .fromPairs()
          .value();

        const arrayStudentsTasks = [];

        _.forEach(GroupByMentor, (value) => {
          arrayStudentsTasks.push(_
            .chain(value)
            .map(item => [item, taskObjectCompleted])
            .fromPairs()
            .value());
        });
        if (arrayStudentsTasks) resolve(arrayStudentsTasks);
      }
    });
  });
}

function mentorScore(arrayStudentsTasks) {
  return new Promise((resolve, reject) => {
    xlsxj({
      input: './uploads/Mentor score.xlsx',
      output: './uploads/Score.json',
      lowerCaseHeaders: true,
    }, (err, result) => {
      if (err) {
        console.log(err);
        reject();
      } else {
        const scoreObject = result.map((item) => {
          const studentProperty = item['ссылка на github студента в формате: https://github.com/nickname'];
          return Object.assign({
            student: studentProperty
              .toLowerCase()
              .replace('https://github.com/', '')
              .replace('http://github.com/', '')
              .replace('rolling-scopes-school/', '')
              .replace('-2018q3', '')
              .replace('/', '')
              .trim(),
            task: item['таск']
              .toLowerCase()
              .replace('code jam ', '')
              .replace('"', '')
              .replace('"', '')
              .replace(', dom events', '')
              .replace(' #1', '')
              .replace('rs ', '')
              .trim(),
            mark: item['оценка'],
          });
        });

        const scoreObjectByStudent = _.chain(scoreObject)
          .groupBy('student')
          .mapValues(object => object.map(value => _.omit(value, 'student')))
          .value();

        const scoreObjectFinished = _.chain(scoreObjectByStudent)
          .map((value, key) => [key, _.chain(value)
            .map(item => [item.task, item.mark])
            .fromPairs()
            .value(),
          ])
          .fromPairs()
          .value();

        const arrayTasks = [];

        _.forEach(arrayStudentsTasks, item => arrayTasks.push(_.fromPairs(
          _.map(item, (value, key) => [key, _.defaults(scoreObjectFinished[key], value)]),
        )));
        if (arrayTasks) resolve(arrayTasks);
      }
    });
  });
}

function secondNameGithubAccount(arrayTasks) {
  return new Promise((resolve, reject) => {
    xlsxj({
      input: './uploads/Mentor-students pairs.xlsx',
      output: './uploads/PairsGithub.json',
      sheet: 'second_name-to_github_account',
      lowerCaseHeaders: true,
    }, (err, result) => {
      if (err) {
        console.error(err);
        reject();
      } else {
        const githubObject = result.map((item) => {
          const object = Object.assign({
            mentor: `${item.name} ${item.surname}`.toLowerCase(),
            mentorGithub: item.github
              .toLowerCase()
              .replace('https://github.com/', '')
              .replace('http://github.com/', '')
              .replace('/', '')
              .trim(),
            count: item.count,
          });
          return object;
        });

        githubObject.sort((a, b) => {
          if (a.mentor > b.mentor) return -1;
          if (a.mentor < b.mentor) return 1;
          return 0;
        });

        const githubObjectCompleted = _.map(githubObject, item => item.mentorGithub);

        const objectJSON = _.chain(arrayTasks)
          .map((item, key) => [githubObjectCompleted[key], item])
          .fromPairs()
          .value();
        if (objectJSON) resolve(objectJSON);
      }
    });
  });
}

function createJSON(objectJSON) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./uploads/result.json', JSON.stringify(objectJSON), (error) => {
      if (error) {
        console.log('Error during a writing of a file');
        reject();
      }
      console.log('File was written.');
      resolve();
    });
  });
}

function publicData() {
  let object;
  fs.readFile('./uploads/result.json', 'utf8', (err, data) => {
    if (err) throw err;
    object = JSON.parse(data);
  });
  app.get('*', (req, res) => {
    res.send(object);
  });
}

app.use(cors());

pairsMentorStudents()
  .then(value => tasks(value))
  .then(value => mentorScore(value))
  .then(value => secondNameGithubAccount(value))
  .then(value => createJSON(value))
  .then(publicData);

module.exports = app;
