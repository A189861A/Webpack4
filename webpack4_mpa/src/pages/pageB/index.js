import _ from 'lodash'
import './b.css'

function component() {
  let element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'pageB'], ' ')

  return element
}

document.body.appendChild(component())
