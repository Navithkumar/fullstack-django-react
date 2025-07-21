import { useForm } from 'react-hook-form';
import './form.css';

function Form({ fields, onSubmit, buttonText = 'Submit' }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const renderField = (field) => {
        const commonProps = {
            ...register(field.name, field.validation || {}),
            className: `form-control ${errors[field.name] ? 'is-invalid' : ''}`,
            placeholder: field.placeholder || '',
        };

        switch (field.type) {
            case 'select':
                return (
                    <select {...commonProps}>
                        <option value="">Select {field.label}</option>
                        {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                );

            case 'textarea':
                return <textarea {...commonProps} rows={field.rows || 3} />;

            case 'file':
                return (
                    <input
                        type="file"
                        {...register(field.name)}
                        className="form-control"
                    />
                );

            default:
                return <input type={field.type} {...commonProps} />;
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="custom-form border rounded p-4 shadow-sm bg-white"
        >
            {fields.map((field, index) => (
                <div className="mb-3" key={index}>
                    <label className="form-label fw-bold">{field.label}</label>
                    {renderField(field)}
                    {errors[field.name] && (
                        <div className="invalid-feedback">
                            {errors[field.name].message}
                        </div>
                    )}
                </div>
            ))}

            <button type="submit" className="btn btn-primary w-100">
                {buttonText}
            </button>
        </form>
    );
}

export default Form;
