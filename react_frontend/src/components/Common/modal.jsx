import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import '../Common/modal.css';

const CommonModal = ({ title, isOpen, onClose, fields, onSubmit }) => {
    if (!isOpen) return null;

    const validationSchema = fields.reduce((schema, field) => {
        if (field.validation) {
            if (field.type === 'file') {
                schema[field.name] = field.validation.required
                    ? Yup.mixed()
                          .required(
                              field.validation.required || 'File is required',
                          )
                          .test('fileType', 'Invalid file type', (value) => {
                              if (!value || !value[0]) return true;
                              return field.accept
                                  ? field.accept
                                        .split(',')
                                        .some(
                                            (type) =>
                                                value[0].type.includes(
                                                    type.replace('*', ''),
                                                ) ||
                                                value[0].name.endsWith(
                                                    type.replace('*', ''),
                                                ),
                                        )
                                  : true;
                          })
                    : Yup.mixed();
            } else {
                schema[field.name] = Yup.string().required(
                    field.validation.required || 'This field is required',
                );
            }
        }
        return schema;
    }, {});

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(Yup.object().shape(validationSchema)),
    });

    const submitHandler = (data) => {
        onSubmit(data);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="close-btn" onClick={onClose}>
                        ✖
                    </button>
                </div>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="modal-body">
                        {fields.map((field) => (
                            <div className="form-group" key={field.name}>
                                <label>{field.label}</label>
                                {field.type === 'file' ? (
                                    <input
                                        type="file"
                                        {...register(field.name)}
                                    />
                                ) : (
                                    <input
                                        type={field.type}
                                        {...register(field.name)}
                                    />
                                )}
                                {errors[field.name] && (
                                    <p className="error">
                                        {errors[field.name].message}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="save-btn">
                            Save
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommonModal;
