import _ from 'lodash'
import './a.css'

function component() {
  let element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'pageA'], ' ')

  return element
}

document.body.appendChild(component())
