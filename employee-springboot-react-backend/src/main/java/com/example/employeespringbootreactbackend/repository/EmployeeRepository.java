package com.example.employeespringbootreactbackend.repository;

import com.example.employeespringbootreactbackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
