import { useEffect, useMemo, useState } from 'react'

export const useForm = ( initialForm = {}, formValidators = {} ) => {

	const [ formState, setFormState ] = useState( initialForm )
	const [ formValid, setFormValid ] = useState( {} )

	useEffect(
		() => {
			createValidators()
		}, 
	[formState])

	useEffect(
		() => {
			setFormState( initialForm )
		}, 
	[initialForm])

	const isFormValid = useMemo(
		() => (
			(Object.values(formValid)).every( field => field === null ) ? true : false
		),
	[formValid])

   const onFormChange = ({ target }) => {
		setFormState({ ...formState, [ target.name ]: target.value })
	}
      
	const onFormReset = () => {
		setFormState( initialForm )
	}

	const createValidators = () => {
		const formCheckedValues = {}

		for (const formField of Object.keys( formValidators )) {
			const [ validator, errorMessage ] = formValidators[ formField ]

			formCheckedValues[`${ formField }Valid`] = validator(formState[formField]) ? null : errorMessage
		}

		setFormValid( formCheckedValues )
	}

	return {
		formState,
		formValid,
		isFormValid,
		onFormChange,
		onFormReset,
	}

}