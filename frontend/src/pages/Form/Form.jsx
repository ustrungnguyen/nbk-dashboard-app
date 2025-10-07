import './form.css';

export default function Form() {
    return (
        <div className='form'>
            {/* Form Title */}
            <div className='form_title_container'>
                <h1 className='form_title'>Điền đầy đủ điểm số và môn học đăng ký thi tốt nghiệp THPT</h1>
            </div>

            <form className='form_container'>
                {/* Card Group */}
                <div className='form_card_group'>

                    {/* Subject 1 card */}
                    <div className='form_subject_card'>
                        <div className='subject_card_title'>Môn học 1</div>
                        <label for="subject1" className='form_subject_label'>Tên môn học:</label>
                        <input 
                            type='text' 
                            id='subject1' 
                            className='form_subject_input' 
                            placeholder='Toán'
                            required />
                    </div>

                    {/* Subject 1 scores container */}
                    <div className='form_score_inputs_container'>
                        {/* Half Semester 1 */}
                        <div className='score_input_card'>
                            <label for="halfsem1_subject1" className='form_score_subject_label'>Giữa Học Kỳ 1</label>
                            <input 
                                type='text' 
                                id='=halfsem1_subject1' 
                                className='form_score_subject_input' 
                                placeholder='9'
                                required />
                        </div>

                        {/* End Semester 1 */}
                        <div className='score_input_card'>
                            <label for="sem1_subject1" className='form_score_subject_label'>Cuối Học Kỳ 1</label>
                            <input 
                                type='text' 
                                id='=sem1_subject1' 
                                className='form_score_subject_input' 
                                placeholder='10'
                                required />
                        </div>

                        {/* Half Semester 2 */}
                        <div className='score_input_card'>
                            <label for="halfsem2_subject1" className='form_score_subject_label'>Giữa Học Kỳ 2</label>
                            <input 
                                type='text' 
                                id='=halfsem2_subject1' 
                                className='form_score_subject_input' 
                                placeholder='8.5'
                                required />
                        </div>
                    </div>

                    {/* Subject 2 card */}
                    <div className='form_subject_card'>
                        <div className='subject_card_title'>Môn học 2</div>
                        <label for="subject2" className='form_subject_label'>Tên môn học:</label>
                        <input 
                            type='text' 
                            id='subject2' 
                            className='form_subject_input' 
                            placeholder='Văn'
                            required />
                    </div>

                    {/* Subject 2 scores container */}
                    <div className='form_score_inputs_container'>
                        {/* Half Semester 2 */}
                        <div className='score_input_card'>
                            <label for="halfsem1_subject2" className='form_score_subject_label'>Giữa Học Kỳ 1</label>
                            <input 
                                type='text' 
                                id='=halfsem1_subject2' 
                                className='form_score_subject_input' 
                                placeholder='7.5'
                                required />
                        </div>

                        {/* End Semester 1 */}
                        <div className='score_input_card'>
                            <label for="sem1_subject2" className='form_score_subject_label'>Cuối Học Kỳ 1</label>
                            <input 
                                type='text' 
                                id='=sem1_subject2' 
                                className='form_score_subject_input' 
                                placeholder='8.25'
                                required />
                        </div>

                        {/* Half Semester 2 */}
                        <div className='score_input_card'>
                            <label for="halfsem2_subject2" className='form_score_subject_label'>Giữa Học Kỳ 2</label>
                            <input 
                                type='text' 
                                id='=halfsem2_subject2' 
                                className='form_score_subject_input' 
                                placeholder='10'
                                required />
                        </div>
                    </div>

                    {/* Subject 3 card */}
                    <div className='form_subject_card'>
                        <div className='subject_card_title'>Môn học 3</div>
                        <label for="subject3" className='form_subject_label'>Tên môn học:</label>
                        <input 
                            type='text' 
                            id='subject3' 
                            className='form_subject_input' 
                            placeholder='Anh'
                            required />
                    </div>

                    {/* Subject 3 scores container */}
                    <div className='form_score_inputs_container'>
                        {/* Half Semester 1 */}
                        <div className='score_input_card'>
                            <label for="halfsem1_subject3" className='form_score_subject_label'>Giữa Học Kỳ 1</label>
                            <input 
                                type='text' 
                                id='=halfsem1_subject3' 
                                className='form_score_subject_input' 
                                placeholder='8'
                                required />
                        </div>

                        {/* End Semester 1 */}
                        <div className='score_input_card'>
                            <label for="sem1_subject3" className='form_score_subject_label'>Cuối Học Kỳ 1</label>
                            <input 
                                type='text' 
                                id='=sem1_subject3' 
                                className='form_score_subject_input' 
                                placeholder='8.75'
                                required />
                        </div>

                        {/* Half Semester 2 */}
                        <div className='score_input_card'>
                            <label for="halfsem2_subject3" className='form_score_subject_label'>Giữa Học Kỳ 2</label>
                            <input 
                                type='text' 
                                id='=halfsem2_subject3' 
                                className='form_score_subject_input' 
                                placeholder='8.5'
                                required />
                        </div>
                    </div>

                    {/* Subject 4 card */}
                    <div className='form_subject_card'>
                        <div className='subject_card_title'>Môn học 4</div>
                        <label for="subject4" className='form_subject_label'>Tên môn học:</label>
                        <input 
                            type='text' 
                            id='subject4' 
                            className='form_subject_input' 
                            placeholder='Địa'
                            required />
                    </div>

                    {/* Subject 4 scores container */}
                    <div className='form_score_inputs_container'>
                        {/* Half Semester 1 */}
                        <div className='score_input_card'>
                            <label for="halfsem1_subject4" className='form_score_subject_label'>Giữa Học Kỳ 1</label>
                            <input 
                                type='text' 
                                id='=halfsem1_subject4' 
                                className='form_score_subject_input' 
                                placeholder='9'
                                required />
                        </div>

                        {/* End Semester 1 */}
                        <div className='score_input_card'>
                            <label for="sem1_subject4" className='form_score_subject_label'>Cuối Học Kỳ 1</label>
                            <input 
                                type='text' 
                                id='=sem1_subject4' 
                                className='form_score_subject_input' 
                                placeholder='9.5'
                                required />
                        </div>

                        {/* Half Semester 2 */}
                        <div className='score_input_card'>
                            <label for="halfsem2_subject4" className='form_score_subject_label'>Giữa Học Kỳ 2</label>
                            <input 
                                type='text' 
                                id='=halfsem2_subject4' 
                                className='form_score_subject_input' 
                                placeholder='8.5'
                                required />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}