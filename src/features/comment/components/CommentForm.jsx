import React, { useState } from 'react'
import { LightbulbFilament, Heart, WarningCircle } from 'phosphor-react'
import Button from '../../../components/ui/Button/Button'
import styles from './CommentForm.module.css'

function CommentForm() {
    const [selectedType, setSelectedType] = useState('sugerencias')
    const [comment, setComment] = useState('')

    const commentTypes = [
        {
            id: 'sugerencias',
            label: 'sugerencias',
            icon: LightbulbFilament,
            color: '#38e47a'
        },
        {
            id: 'cumplidos',
            label: 'Cumplidos',
            icon: Heart,
            color: '#38e47a'
        },
        {
            id: 'inconvenientes',
            label: 'Inconvenientes',
            icon: WarningCircle,
            color: '#38e47a'
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Enviando comentario:', { type: selectedType, comment })
        setComment('')
        setSelectedType('sugerencias')
    }

    const handleCancel = () => {
        setComment('')
        setSelectedType('sugerencias')
    }

    return (
        <div className={styles.formCard}>
            <div className={styles.header}>
                <h2 className={styles.title}>¡nos encantaría saber de ti!</h2>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.typeSelector}>
                    {commentTypes.map((type) => {
                        const IconComponent = type.icon
                        const isSelected = selectedType === type.id

                        return (
                            <button
                                key={type.id}
                                type="button"
                                className={`${styles.typeButton} ${isSelected ? styles.typeButtonActive : ''}`}
                                onClick={() => setSelectedType(type.id)}
                            >
                                <IconComponent
                                    size={20}
                                    weight={isSelected ? 'fill' : 'regular'}
                                    style={{ color: isSelected ? type.color : '#6b7280' }}
                                />
                                <span>{type.label}</span>
                            </button>
                        )
                    })}
                </div>

                <div className={styles.textareaContainer}>
                    <textarea
                        className={styles.textarea}
                        placeholder="describe tus ideas quejas o sugerencias"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={6}
                        required
                    />
                </div>

                <div className={styles.disclaimer}>
                    <p>
                        Es posible que se envíe parte de la información del sistema y de la cuenta a urbany,
                        que la usará para solucionar problemas técnicos y mejorar sus servicios, de acuerdo
                        con su Política de Privacidad y Condiciones del servicio
                    </p>
                </div>

                <div className={styles.actions}>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className={styles.cancelButton}
                    >
                        cancelar
                    </button>
                    <Button
                        type="submit"
                        disabled={!comment.trim()}
                        variant="primary"
                        size="medium"
                    >
                        Aceptar
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CommentForm