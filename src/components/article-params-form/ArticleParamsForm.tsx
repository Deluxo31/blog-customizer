import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Select } from 'src/ui/select/Select';
import { Separator } from 'src/ui/separator/Separator';
import { Text } from 'src/ui/text';
import {
	defaultArticleState,
	OptionType,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useCloseOnOutsideClickOrEsc } from 'src/hooks/useCloseOnOutsideClickOrEsc';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
	onReset: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [currentFormState, setCurrentFormState] = useState(defaultArticleState);
	const sidebarRef = useRef<HTMLElement>(null);

	useCloseOnOutsideClickOrEsc({
		isOpenElement: isFormOpen,
		onClose: () => setIsFormOpen(false),
		elementRef: sidebarRef,
	});

	const updateFormField = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setCurrentFormState((prevState) => ({
				...prevState,
				[field]: value,
			}));
		};
	};

	const handleToggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleCloseForm = () => {
		setIsFormOpen(false);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(currentFormState);
		handleCloseForm();
	};

	const handleResetForm = (e: React.FormEvent) => {
		e.preventDefault();
		setCurrentFormState(defaultArticleState);
		onReset(defaultArticleState);
		handleCloseForm();
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleToggleForm} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleResetForm}>
					<Text
						as={'div'}
						size={31}
						weight={800}
						uppercase={true}
						family={'open-sans'}>
						Задайте параметры
					</Text>

					<Select
						selected={currentFormState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={updateFormField('fontFamilyOption')}
						title='ШРИФТ'
					/>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={currentFormState.fontSizeOption}
						onChange={updateFormField('fontSizeOption')}
						title='РАЗМЕР ШРИФТА'
					/>

					<Select
						selected={currentFormState.fontColor}
						options={fontColors}
						onChange={updateFormField('fontColor')}
						title='ЦВЕТ ШРИФТА'
					/>

					<Separator />

					<Select
						selected={currentFormState.backgroundColor}
						options={backgroundColors}
						onChange={updateFormField('backgroundColor')}
						title='ЦВЕТ ФОНА'
					/>

					<Select
						selected={currentFormState.contentWidth}
						options={contentWidthArr}
						onChange={updateFormField('contentWidth')}
						title='ШИРИНА КОНТЕНТА'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
