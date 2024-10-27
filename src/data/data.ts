import ArrowDownIcon from '@radix-icons/vue/ArrowDownIcon'
import ArrowRightIcon from '@radix-icons/vue/ArrowRightIcon'
import ArrowUpIcon from '@radix-icons/vue/ArrowUpIcon'
import CheckCircledIcon from '@radix-icons/vue/CheckCircledIcon'
import CircleIcon from '@radix-icons/vue/CircleIcon'
import CrossCircledIcon from '@radix-icons/vue/CrossCircledIcon'
import QuestionMarkCircledIcon from '@radix-icons/vue/QuestionMarkCircledIcon'
import StopwatchIcon from '@radix-icons/vue/StopwatchIcon'
import { h } from 'vue'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: h(QuestionMarkCircledIcon),
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: h(CircleIcon),
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: h(StopwatchIcon),
  },
  {
    value: 'done',
    label: 'Done',
    icon: h(CheckCircledIcon),
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: h(CrossCircledIcon),
  },
]

export const priorities = [
  {
    value: 'low',
    label: 'Low',
    icon: h(ArrowDownIcon),
  },
  {
    value: 'medium',
    label: 'Medium',
    icon: h(ArrowRightIcon),
  },
  {
    value: 'high',
    label: 'High',
    icon: h(ArrowUpIcon),
  },
]
