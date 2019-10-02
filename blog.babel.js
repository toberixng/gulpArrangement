'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var getBlogPost = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var titlePromise, loremPromise, _ref2, _ref3, titleResponse, loremResponse;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            titlePromise = getRequest(api + '/generate-title');
            loremPromise = getRequest(api + '/generate-lorem');
            _context.prev = 2;
            _context.next = 5;
            return _promise2.default.all([titlePromise, loremPromise]);

          case 5:
            _ref2 = _context.sent;
            _ref3 = (0, _slicedToArray3.default)(_ref2, 2);
            titleResponse = _ref3[0];
            loremResponse = _ref3[1];

            document.querySelector('main').appendChild(buildPostElement(titleResponse.title, loremResponse.lorem));
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](2);

            document.querySelector('main').appendChild(buildPostElement('An error occurred!', _context.t0));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 12]]);
  }));

  return function getBlogPost() {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = 'https://us-central1-open-classrooms-js-for-the-web.cloudfunctions.net/widgets';
var loadButton = document.getElementById('load-button');

function getRequest(url) {
  return new _promise2.default(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status !== 200) {
          reject(JSON.parse(request.response));
        }
        resolve(JSON.parse(request.response));
      }
    };
    request.send();
  });
}

loadButton.addEventListener('click', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          getBlogPost();

        case 1:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));

function buildPostElement(title, content) {
  var card = document.createElement('div');
  var cardBody = document.createElement('div');
  var cardTitle = document.createElement('h2');
  var cardContent = document.createElement('p');

  card.classList.add('card');
  cardBody.classList.add('card-body');
  cardTitle.classList.add('card-title');
  cardContent.classList.add('card-text');

  cardTitle.textContent = title;
  cardContent.textContent = content;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardContent);
  card.appendChild(cardBody);

  return card;
}
