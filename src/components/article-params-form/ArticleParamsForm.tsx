import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useEffect } from 'react';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Select } from 'src/ui/select/Select';
import { Separator } from 'src/ui/separator/Separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	formState: ArticleStateType;
	onFormChange: (newState: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	formState,
	onFormChange,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!sidebarRef.current?.contains(e.target as Node) && isOpen) {
				onToggle();
			}
		};
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				onToggle();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onToggle]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply();
	};

	const handleResetForm = (e: React.FormEvent) => {
		e.preventDefault();
		onReset();
	};

	const updateFormState = (
		key: keyof ArticleStateType,
		value: ArticleStateType[keyof ArticleStateType]
	) => {
		onFormChange({
			...formState,
			[key]: value,
		});
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
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
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => updateFormState('fontFamilyOption', option)}
						title='ШРИФТ'
					/>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => updateFormState('fontSizeOption', option)}
						title='РАЗМЕР ШРИФТА'
					/>

					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) => updateFormState('fontColor', option)}
						title='ЦВЕТ ШРИФТА'
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => updateFormState('backgroundColor', option)}
						title='ЦВЕТ ФОНА'
					/>

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => updateFormState('contentWidth', option)}
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
