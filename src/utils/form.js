export const formSubmit = (actionCreator, payload, formActions) => {
  formActions.setSubmitting(true)
  actionCreator({
    ...payload,
    resolve: () => {
      formActions.setSubmitting(false)
    },
    reject: ex => {
      const res = ex.response ? ex.response : ex
      const errors = res.data || res.error || res // TODO: assumes backend response are wrapped within data or error field

      if (typeof errors === 'object') {
        const { message, fieldErrors, ...otherFieldErrors } = errors

        formActions.setErrors({
          globalError: message,
          ...fieldErrors,
          ...otherFieldErrors
        })
      } else {
        formActions.setErrors({
          globalError: typeof errors === 'string' ? errors : 'Internal Server Error'
        })
      }

      formActions.setSubmitting(false)
    }
  })
}
