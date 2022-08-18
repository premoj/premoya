import { NotificationParams } from "@/types/NotificationManager.types"

export type Link = {
  name: string
  href: string
}

export enum Variant {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export class Notification {
  readonly duration = 4000
  close = false
  title: string
  id: number
  variant: Variant
  closable: boolean
  hidden: boolean
  minimizable: boolean
  indefinite: boolean
  link: Link
  message?:
    | string
    | {
        component: unknown
        data: unknown
      }
  transactionFlow?: {
    component: unknown
    data: unknown
  }

  constructor(params: NotificationParams, id: number) {
    this.title = params.title
    this.hidden = false
    this.id = id
    this.variant = params.variant
    this.message = params.message
    this.closable = params.closable
    this.minimizable = this.variant === Variant.LOADING
    this.link = params.link
    this.indefinite = params.indefinite
    this.transactionFlow = params.transactionFlow
  }

  remove() {
    this.close = true
  }

  setSuccess(message: string) {
    this.variant = Variant.SUCCESS
    this.message = message
    this.minimizable = false
  }

  setError(message: string) {
    this.minimizable = false
    this.message = message
    this.variant = Variant.ERROR
  }
}

export class NotificationStepsData {
  constructor(readonly steps: { finished: boolean; processing: boolean; link?: Link }[]) {}

  setLink(link: string) {
    const index = this.steps.findIndex(s => s.processing)

    if (index !== -1) {
      this.steps[index].link = {
        name: "View",
        href: "test",
      }
    }
  }

  nextStep() {
    const index = this.steps.findIndex(s => s.processing)

    if (index !== -1) {
      this.steps[index].processing = false
      this.steps[index].finished = true

      if (index < this.steps.length - 1) {
        this.steps[index + 1].processing = true
      }
    }

    return !this.steps.some(s => !s.finished)
  }
}

export enum ParallelDataState {
  PROCESSING,
  FINISHED,
  ERROR,
}
