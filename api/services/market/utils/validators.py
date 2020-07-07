def validate_position_id(position_id):
    if position_id is None:
        raise ValueError('Please provide a position.')

    if isinstance(position_id, int) is False:
        raise ValueError('Please the position id as a number.')

def validate_city_id(city_id):
    if city_id is None:
        raise ValueError('Please provide a city.')

    if isinstance(city_id, int) is False:
        raise ValueError('Please provide the city id as a number.')

def validate_technology_id(technology_id):
    if technology_id is None:
        raise ValueError('Please provide a programming technology.')

    if isinstance(technology_id, int) is False:
        raise ValueError('Please provide the programming technology id as a number.')

def validate_annual_salary(annual_salary):
    if annual_salary is None:
        raise ValueError('Please provide an annual salary.')

    if isinstance(annual_salary, int) is False:
        raise ValueError('Please provide the annual salary as a number.')

def validate_work_experience(work_experience):
    if work_experience is None:
        raise ValueError('Please provide a work experience.')

    if isinstance(work_experience, int) is False:
        raise ValueError('Please provide the work experience as a number.')

    if work_experience < 1 or work_experience > 80:
        raise ValueError('Please provide the work experience in a range from 1 to 80.')
